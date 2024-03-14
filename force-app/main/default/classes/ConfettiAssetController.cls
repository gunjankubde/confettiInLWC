/*************************************************************************************************
Author - Gunjan Kubde
Date - 3 Jan 2023
Description - Generic Apex Class to get CelebrationMsgShown__c checbox value for SObjects 
and update it.
**************************************************************************************************/
public without sharing class ConfettiAssetController {
    
    //Description - get CelebrationMsgShown__c checbox value for SObjects.
    @AuraEnabled
    public static SObject getCelebrationCheckbox(Id recordId, String objectApiName){
        try {

            if(recordId != null){
                sObject sObj = Schema.getGlobalDescribe().get(objectApiName).newSObject();
                String strQuery = 'SELECT Id, CelebrationMsgShown__c FROM ' + objectApiName + ' WHERE Id =: recordId';

                sObj = Database.query(strQuery);

                return sObj;
            }else{
                return null;
            }
        } catch (Exception e) {
            System.debug('Error in ConfettiAssetController.getCelebrationCheckbox ' + e.getMessage());
            throw new AuraHandledException('Error in ConfettiAssetController.getCelebrationCheckbox ' + e.getMessage());
            //return null;
        }
    }

    //Description - update CelebrationMsgShown__c checbox value for SObjects.
    @AuraEnabled
    public static string updateRecord(Id recordId, String objectApiName){
        try {
            sObject obj = Schema.getGlobalDescribe().get(objectApiName).newSObject();
            obj.put('Id', recordId);
            obj.put('CelebrationMsgShown__c', true);
            update obj;

            return 'success';
        } catch (Exception e) {
            System.debug('Error in ConfettiAssetController.updateRecord ' + e.getMessage());
            return 'failed';
        }
    }
}