sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/odata/v2/ODataModel"
], function (Controller, JSONModel, ODataModel) {
	"use strict";

	return Controller.extend("com.BandBHierarchy.BandBHierarchy.controller.Hierarchy", {
		onInit: function () {
			var oModel = this.getView().getModel();
			var oModelJson = new sap.ui.model.json.JSONModel();
			oModel.read("/Hierarchy", {
				success: function (oData, response) {
					let iDepthestCurrentLevel = oData.results.reduce((accumulator, currentValue) => {
						return (accumulator > currentValue.LEVEL) ? accumulator : currentValue.LEVEL;
					}, 0);
					const aResults = oData.results;

					while (iDepthestCurrentLevel > 0) {
						let i = 0,
							iFindedIndex, iFindedParentIndex, oSplicedRow;
						while (i < aResults.length) {
							iFindedIndex = aResults.findIndex(x => x.LEVEL === iDepthestCurrentLevel);
							if (iFindedIndex > -1) {
								iFindedParentIndex = aResults.findIndex(x => {
									return x.RESULT_NODE === aResults[iFindedIndex].PRED_NODE;
								});
								if (iFindedParentIndex > -1) {
									oSplicedRow = aResults.splice(iFindedIndex, 1);
									aResults[iFindedParentIndex]["children"] = (aResults[iFindedParentIndex]["children"]) ? aResults[iFindedParentIndex][
										"children"
									] : [];
									aResults[iFindedParentIndex]["children"].push(oSplicedRow[0]);
								} else {
									i++;
								}
							} else {
								i++;
							}
						}

						iDepthestCurrentLevel--;
					}

					oModelJson.setData(aResults);
					this.getView().setModel(oModelJson, "oJSONModel");
				}.bind(this),
					// const aConvertedResponse = oData.results.map(oRow => {
					// 	if (oRow.PRED_NODE !== null) {
					// 		const vParent = oData.results.find(x => x.RESULT_NODE === oRow.PRED_NODE);
					// 		oRow.PRED_NODE = (vParent) ? vParent.ORDINAL : null;
					// 	}
					// 	if (oRow.IS_LEAF === 0) {
					// 		var vLeaf = "expanded";
					// 		oRow.IS_LEAF = vLeaf;
					// 	}else{
					// 		vLeaf = "leaf";
					// 		oRow.IS_LEAF = vLeaf;
					// 	};
					// // var DrillState = oRow.IS_LEAF;
					// // var ParentNode = oRow.PRED_NODE;
					// // var Node = oRow.ORDINAL;
					// // var Level = oRow.LEVEL;
					// return oRow;
					// });

					// oModelJson.setData(aConvertedResponse);
					// this.getView().setModel(oModelJson, "oJSONModel");
				// }.bind(this),
				error: function (response) {}
			});
		}
	});
});