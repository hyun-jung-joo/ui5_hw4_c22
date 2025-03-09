sap.ui.define(
    ["sap/ui/core/mvc/Controller", "sap/m/MessageToast"],
    (Controller, MessageToast) => {
        "use strict";

        return Controller.extend("sync.c22.hw4.controller.Main", {
            onInit() {},

            // Task 3. 메시지 토스트로 출력
            // 한 아이템을 선택했을 때 메시지 토스트로 정보를 출력하는 이벤트 핸들러 메소드
            onPress(oEvent) {
                var oSelectedItem = oEvent.getSource(); // 클릭한 부분 가져오기
                var oContext = oSelectedItem.getBindingContext("conn"); // conn 모델 부분 가져오기
                var oData = oContext.getProperty(); // 그 안의 모든 값을 가지고 온다.

                // 메시지 토스트로 정보 출력
                MessageToast.show(
                    `선택하신 라인은\n항공사: ${oData.CARRID}, 항공편: ${oData.CONNID} \n의 정보입니다.`,
                    {
                        width: "100em",
                    }
                );
            },

            // Task 4. Dialog 로 항공편 정보 출력
            // 한 아이템을 선택했을 때 Dialog 로 정보를 출력하는 이벤트 핸들러 메소드
            // 비동기로 구현해준다.
            async onOpenDialog(oEvent) {
                var oSelectedItem = oEvent.getSource(); // 클릭한 부분 가져오기
                var oContext = oSelectedItem.getBindingContext("conn"); // conn 모델 부분 가져오기
                var sPath = oContext.getPath(); // 현재 선택한 부분의 경로를 가져온다.

                // Dialog 를 비동기로 load 한다.
                // 이때 보이게 할 Dialog의 경로를 적어준다.
                this.oDialog ??= await this.loadFragment({
                    name: "sync.c22.hw4.view.Info",
                });

                // 위에서 저장해 둔 현재 아이템의 경로와 모델 정보를 함께 Dialog에 binding 해준다.
                this.oDialog.bindElement({ path: sPath, model: "conn" });
                // Fragment에서 가져온 Dialog를 Open
                this.oDialog.open();
            },

            // Dialog의 닫기 버튼에 해당하는 이벤트 핸들러 메소드
            onClose() {
                var oDialog = this.byId("idDialog"); // id를 통해 Dialog 를 찾는다.
                // 존재하다면, Dialog 를 close 해준다.
                if (oDialog) {
                    oDialog.close();
                }
            },
        });
    }
);
