/*************************************************************************************************
Author - Gunjan Kubde
Date - 3 Jan 2023
Description - Generic LWC Component to show confetti celebration. Can be called as child component.
**************************************************************************************************/
import { LightningElement, api } from 'lwc';
import { loadScript } from 'lightning/platformResourceLoader';
import confettijs from '@salesforce/resourceUrl/confettijs'
import getCelebrationCheckbox from '@salesforce/apex/ConfettiAssetController.getCelebrationCheckbox';
import updateRecord from '@salesforce/apex/ConfettiAssetController.updateRecord';
import Congrats from '@salesforce/label/c.Congrats';
import Congratulations from '@salesforce/label/c.Congratulations';
import Done from '@salesforce/label/c.Done';
import ErrorMsg from '@salesforce/label/c.ErrorMsg';

export default class ConfettiAsset extends LightningElement {

    @api recordId;
    @api objectApiName;
    @api celebrationType;
    @api celebrationMessage;
    @api showCelebrationModal = false;
    showCelebrationModalLocal = false;
    showErrorMsg = false;
    label = {
        Congrats,
        Congratulations,
        Done,
        ErrorMsg
    }

    connectedCallback() {

        console.log('objectApiName ' + this.objectApiName);

        if (this.recordId) {
            getCelebrationCheckbox({ recordId: this.recordId, objectApiName: this.objectApiName }) //Impicit Apex to get 'CelebrationMsgShown__c' checkbox value.
                .then(result => {
                    console.log('result ', result);

                    if (!result.CelebrationMsgShown__c) {
                        this.showCelebrationModalLocal = this.showCelebrationModal;
                        this.loadresourceAndShowConfetti();
                        this.updateRecord();
                    }else{
                        this.showCelebrationModalLocal = false;
                    }

                }).catch(error => {
                    this.showErrorMsg = true;
                    this.showCelebrationModalLocal = false;
                    this.showError(error);
                })
        } else {
            this.showCelebrationModalLocal = this.showCelebrationModal;
            this.loadresourceAndShowConfetti();
        }
    }

    loadresourceAndShowConfetti() {
        loadScript(this, confettijs)
            .then(() => {

                switch (this.celebrationType) {
                    case 'Basic':
                        this.basic();
                        break;
                    case 'Firework':
                        this.firework();
                        break;
                    case 'Shower':
                        this.shower();
                        break;
                    case 'Celebration':
                        this.celebration();
                        break;
                    case 'Burst':
                        this.burst();
                        break;
                }
            });
    }

    updateRecord() {
        let fields = {
            Id: this.recordId,
            CelebrationMsgShown__c: true
        }

        updateRecord({ recordId: this.recordId, objectApiName: this.objectApiName}) //Impicit Apex to update 'CelebrationMsgShown__c' checkbox value.
            .then(result => {
                console.log('Success');
            })
            .catch(error => {
                this.showError(error);
            })

    }

    get messageBasedOnRewardType() {
        return (this.celebrationMessage) ? this.celebrationMessage : this.label.Congrats;
    }

    closeCelebrationModal() {
        this.showCelebrationModal = false;
        location.reload();
    }

    @api basic() {
        confetti({
            particleCount: 200,
            startVelocity: 60,
            spread: 150,
            origin: {
                y: 0.9
            },
        });
    }

    @api firework() {
        var end = Date.now() + (15 * 100);
        var interval = setInterval(function () {
            if (Date.now() > end) {
                return clearInterval(interval);
            }
            confetti({
                particleCount: 450,
                startVelocity: 30,
                spread: 360,
                ticks: 60,
                origin: {
                    x: Math.random(),
                    y: Math.random()
                },
            });
        }, 200);
    }

    @api shower() {
        var end = Date.now() + (15 * 100);
        (function frame() {
            confetti({
                particleCount: 10,
                startVelocity: 0,
                ticks: 300,
                origin: {
                    x: Math.random(),
                    y: 0
                },
            });
            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());
    }

    @api celebration() {
        var end = Date.now() + (15 * 100);
        (function frame() {
            confetti({
                particleCount: 10,
                angle: 60,
                spread: 25,
                origin: {
                    x: 0,
                    y: 0.65
                },
            });
            confetti({
                particleCount: 10,
                angle: 120,
                spread: 25,
                origin: {
                    x: 1,
                    y: 0.65
                },
            });
            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());
    }

    @api burst() {
        var end = Date.now() + (15 * 75);
        //These are four diffrent confetti in frour diffrent corner
        (function frame() {
            // #1
            confetti({
                particleCount: 7,
                startVelocity: 25,
                angle: 335,
                spread: 10,
                origin: {
                    x: 0,
                    y: 0,
                },
            });
            // #2
            confetti({
                particleCount: 7,
                startVelocity: 25,
                angle: 205,
                spread: 10,
                origin: {
                    x: 1,
                    y: 0,
                },
            });
            // #3
            confetti({
                particleCount: 7,
                startVelocity: 35,
                angle: 140,
                spread: 30,
                origin: {
                    x: 1,
                    y: 1,
                },
            });
            // #4
            confetti({
                particleCount: 7,
                startVelocity: 35,
                angle: 40,
                spread: 30,
                origin: {
                    x: 0,
                    y: 1,
                },
            });
            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());
    }

    showError(error) {
        console.log('Error ', error);
        console.log('Error ', JSON.stringify(error));
    }

}