sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/odata/v2/ODataModel"
], function (Controller, ODataModel) {
	"use strict";

	return Controller.extend("com.BandBHierarchy.BandBHierarchy.controller.Hierarchy", {
		onInit: function () {
			var oModel2 = this.getOwnerComponent().getModel();
			this.getView().setModel(oModel2);
		}
	});
});