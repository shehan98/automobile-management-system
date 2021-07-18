const Notifications = require('../models/notificationModel')
const NotificationStepper = require('../models/notificationStepperModel')

const notificationCtrl = {
    createNotification: async (req, res) =>{

        try {
            const customer = req.body.customer;
            const title = req.body.title;
            const message = req.body.message;
            const document1 = req.body.document1;
            const document2 = req.body.document2;
            const document3 = req.body.document3;
            const document4 = req.body.document4;
            const document5 = req.body.document5;

            const notification = new Notifications({
                customer,
                title,
                message,
                document1,
                document2,
                document3,
                document4,
                document5
            });
            await notification.save()
            res.json({msg: "Created a notification"})
        } catch (err) {
            console.log(err)
            return res.status(500).json({msg: err.message})
            
        }
    },

    getAllNotification: async (req, res) => {
        try {
            Notifications.find()
                .then(notifications => res.json(notifications))
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    setStep: async (req, res) => {
        try {
            const customer = req.body.customer;
            const step = req.body.currentStep;

            const newStep = new NotificationStepper({
                customer,
                step
            });
            await newStep.save()
            res.json({msg: "Step updated"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    getStep: async (req, res) => {
        try {
            NotificationStepper.find()
                .then(newStep => res.json(newStep))
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },

    updateStep: async(req, res) =>{
        try {
            const {currentStep} = req.body;
            const step = currentStep
            await NotificationStepper.findOneAndUpdate({
                step
            })
            res.json({msg: "Step updated"})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}

module.exports = notificationCtrl