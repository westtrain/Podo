const { Statement } = require("../models");

module.exports = {
  getPaymentPointWithdrawal: async (req, res) => {
    // 모든 내역를 조회해서 클라이언트로 보내준다.
    const userId = req.userId;
    try {
      console.log(userId);
      const statementInfo = await Statement.findAll({
        where: {
          user_id: userId,
        },
        raw: true,
      });
      console.log(statementInfo);
      if (statementInfo) {
        return res.status(200).json({ data: statementInfo });
      }
      return res.status(404).json({ message: "Failed" });
    } catch (err) {
      return res.status(500).json({ message: "Server Error" });
    }
  },

  completedPayment: async (req, res) => {
    try {
      // req의 body에서 imp_uid, merchant_uid 추출
      const { imp_uid, merchant_uid } = req.body;

      // 1. 액세스 토큰(access token) 발급 받기
      const token = generateImportToken();

      // 2. imp_uid로 아임포트 서버에서 결제 정보 조회
      const getPaymentData = await axios({
        url: `https://api.iamport.kr/payments/${imp_uid}`, // imp_uid 전달
        method: "GET",
        headers: { Authorization: token }, // 인증 토큰 Authorization header에 추가
      });
      // console.log(getPaymentData);
      // return -1;
      if (getPaymentData.length > 1) {
      }
      // 조회한 결제 정보
      const paymentData = getPaymentData.data.response;

      // 3. DB에서 결제되어야 하는 금액 조회
      const statementInfo = await Statement.findOne({ where: { merchant_uid } });
      const amountToBePaid = Number(statementInfo.amount); // 결제 되어야 하는 금액

      // 4. 결제 검증하기

      // 결제금액 불일치 => 위/변조 된 결제
      if (paymentData.amount !== amountToBePaid) {
        return res.status(200).json({
          status: "forgery",
          // orderInfo, // test
          // payment: paymentData.amount, // test
          // amountToBePaid: orderInfo.amount, // test
          message: "위조된 결제시도",
        });
      }

      // Statement 테이블에 결제 완료로 변경
      await Statement.update(
        {
          /*
          // 주문 상태
          success: true,
          status: paymentData.status,
          // 주문자 정보
          buyer_name: paymentData.buyer_name,
          buyer_tel: paymentData.buyer_tel,
          buyer_email: paymentData.buyer_email,
          buyer_addr: paymentData.buyer_addr,
          buyer_postcode: paymentData.buyer_postcode,
          // 결제 정보
          imp_uid: paymentData.imp_uid,
          pg_provider: paymentData.pg_provider,
          pg_tid: paymentData.pg_tid,
          pay_method: paymentData.pay_method,
          paid_amount: paymentData.amount,
          paid_at: paymentData.paid_at,
          receipt_url: paymentData.receipt_url,
          card_name: paymentData.card_name,
          apply_num: paymentData.apply_num,
          */
          type: paymentData.status,
        },
        { where: { merchant_uid } }
      );

      // Capital 테이블에 결제 금액 충전
      await Capital.count().then((id) => {
        Capital.findOne({ where: { id } }).then(async (data) => {
          const total_amount = data.total_amount + paymentData.amount;
          console.log("total_amount==========", total_amount);
          await Capital.create({ money: paymentData.amount, total_amount, state: "입금" });
        });
      });

      // 다음 결제 예약 요청
      const fulfilledParty = [];
      for (let i = 0; i < fulfilledParty.length; i++) {
        if (fulfilledParty[i] !== undefined) {
          User.findAll({
            include: [
              {
                model: Payment,
                attributes: ["settlement_date", "user_id", "customer_uid", "use_podo"],
              },
            ],
            where: { id: fulfilledParty[i].userIdList },
            attributes: ["money"],
            raw: true,
          })
            .then((data) => {
              fulfilledParty[i]["userPayInfo"] = data;

              // 2. 가져온 데이터를 조합해서 아임포트에 전달하는 데이터 양식에 맞게 정리해서 사용 가능하게 만든다.
              const userPaymentInfo = [];

              if (fulfilledParty[i].userPayInfo.length > 1) {
                for (let uid of fulfilledParty[i].userPayInfo) {
                  // 맴버수에 맞추어 가격은 나누어준다
                  const totalPrice = fulfilledParty[i].ott_price;
                  const members = fulfilledParty[i].divide;
                  const amount = Math.ceil(totalPrice / members / 10) * 10;
                  userPaymentInfo.push(
                    makeDataSet(
                      uid["Payments.user_id"],
                      uid["Payments.customer_uid"],
                      uid["Payments.settlement_date"],
                      fulfilledParty[i].ott_name,
                      amount
                    )
                  );
                }
              } else {
                const uid = fulfilledParty[i].userPayInfo[0];
                // 맴버수에 맞추어 가격은 나누어준다
                const totalPrice = fulfilledParty[i].ott_price;
                const members = fulfilledParty[i].divide;
                const amount = Math.ceil(totalPrice / members / 10) * 10;
                userPaymentInfo.push(
                  makeDataSet(
                    uid["Payments.user_id"],
                    uid["Payments.customer_uid"],
                    uid["Payments.settlement_date"],
                    fulfilledParty[i].ott_name,
                    amount
                  )
                );
              }
              // console.log(userPaymentInfo[0].schedules);
              return userPaymentInfo;
            })
            .then(async (data) => {
              // 3. 정기 결제 요청을 subscritpion을 통해 한다.
              if (data.length > 1) {
                for (let userInfo of data) {
                  await requestPayment(userInfo);
                }
              } else {
                const userInfo = data[0];
                await requestPayment(userInfo);
              }
            });
        }
      }
      console.log("Requested payment");

      switch (paymentData.status) {
        case "paid":
          return res.json({
            status: "success",
            message: "일반 결제 성공",
          });
      }
    } catch (err) {
      // 환불 로직 작성 필요
      console.error(err);
      res.status(400).json({ message: "Client Error" });
    }
  },
};
