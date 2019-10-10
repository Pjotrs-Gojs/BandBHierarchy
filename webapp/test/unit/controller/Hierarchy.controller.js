/*global QUnit*/

sap.ui.define([
	"com/BandBHierarchy/BandBHierarchy/controller/Hierarchy.controller"
], function (Controller) {
	"use strict";

	QUnit.module("Hierarchy Controller");

	QUnit.test("I should test the Hierarchy controller", function (assert) {
		var oAppController = new Controller();
		oAppController.onInit();
		assert.ok(oAppController);
	});

});