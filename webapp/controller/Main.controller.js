sap.ui.define(
    ["sap/ui/core/mvc/Controller", "sap/m/MessageToast"],
    (Controller, MessageToast) => {
        "use strict";

        return Controller.extend("sync.c22.hw4.controller.Main", {
            onInit() {},

            // 한 아이템을 선택했을 때 발생하는 이벤트에 관한 메소드 구현
            onPress(oEvent) {
                var oSelectedItem = oEvent.getSource(); // 클릭한 부분 가져오기
                var oContext = oSelectedItem.getBindingContext("conn"); // conn 모델 부분 가져오기
                var oData = oContext.getProperty(); // 그 안의 모든 값을 가지고 온다.

                // Task 3. 메시지 토스트로 출력
                MessageToast.show(
                    `선택하신 라인은\n항공사: ${oData.CARRID}, 항공편: ${oData.CONNID} \n의 정보입니다.`,
                    {
                        width: "100em",
                    }
                );
            },

            async onOpenDialog(oEvent) {
                var oSelectedItem = oEvent.getSource(); // 클릭한 부분 가져오기
                var oContext = oSelectedItem.getBindingContext("conn"); // conn 모델 부분 가져오기
                var sPath = oContext.getPath();

                this.oDialog ??= await this.loadFragment({
                    name: "sync.c22.hw4.view.Info",
                });

                // Fragment에서 가져온 Dialog를 Open
                this.oDialog.open();
                this.oDialog.bindElement({ path: sPath, model: "conn" });
            },

            onClose() {
                var oDialog = this.byId("idDialog");
                if (oDialog) {
                    oDialog.close();
                }
            },
        });
    }
);
