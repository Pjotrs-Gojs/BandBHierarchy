function initModel() {
	var sUrl = "/BB/com/bbnew/Service/oData.xsodata/";
	var oModel = new sap.ui.model.odata.ODataModel(sUrl, true);
	sap.ui.getCore().setModel(oModel);
}