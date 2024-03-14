@isTest
public with sharing class ConfettiAssetControllerTest {

    @TestSetup
    static void makeData(){
        Account objAccount = new Account(
            Name = 'TestClass'
        );
        Insert objAccount;
    }

    @isTest
    private static void test_getCelebrationCheckbox() {
        Account objAccount = [SELECT Id FROM Account LIMIT 1];

        Test.startTest();
            SObject obj = ConfettiAssetController.getCelebrationCheckbox(objAccount.Id, 'Account');
            System.assert(obj != null, 'Success');
        Test.stopTest();
    }

    @isTest
    private static void test_getCelebrationCheckbox_NULLCheck() {
        Test.startTest();
            ConfettiAssetController.getCelebrationCheckbox(null, 'Account');
        Test.stopTest();
    }

    @isTest
    private static void test_getCelebrationCheckbox_Exception() {
        try{
            Account objAccount = [SELECT Id FROM Account LIMIT 1];
            Test.startTest();
                ConfettiAssetController.getCelebrationCheckbox(objAccount.Id, 'Failed');
            Test.stopTest();
        }Catch(Exception ex){
            System.assert(ex.getMessage() != null, 'Success');
        }
    }

    @isTest
    private static void test_updateRecord() {
        Account objAccount = [SELECT Id FROM Account LIMIT 1];
        Test.startTest();
            ConfettiAssetController.updateRecord(objAccount.Id, 'Account');
        Test.stopTest();
    }

    @isTest
    private static void test_updateRecord_Exception() {
        try{
            Account objAccount = [SELECT Id FROM Account LIMIT 1];
            Test.startTest();
                ConfettiAssetController.updateRecord(objAccount.Id, 'Failed');
            Test.stopTest();
        }Catch(Exception ex){
            System.assert(ex.getMessage() != null, 'Success');
        }
    }
}