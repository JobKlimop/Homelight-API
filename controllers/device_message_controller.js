const Device = require('../models/device.model');
const DeviceEvent = require('../models/device_event.model');
const EventController = require('./event_controller');
const GroupController = require('./group_client_controller');

module.exports = {
    
    async deviceIdSet(message) {
        let updatedDevice = await Device.findOneAndUpdate({_id: message.previousId}, {_id: message._id}, {new: true})
        DeviceEvent.create(EventController.deviceEvent('device.edited', updatedDevice));
    },

    async deviceNameSet(message) {
        let updatedDevice = await Device.findOneAndUpdate({_id: message._id}, {deviceName: message.deviceName}, {new: true})
        DeviceEvent.create(EventController.deviceEvent('device.edited', updatedDevice));
    },

    async groupIdSet(message) {
        if(await GroupController.addDeviceToGroup(message._id, message.groupId)) {
            let updatedDevice = await Device.findOneAndUpdate({_id: message._id}, {groupId: message.groupId}, {new: true})
            await DeviceEvent.create(EventController.deviceEvent('device.edited', updatedDevice));
        }
    },

    async powerStateSet(message) {
        let updatedDevice = await Device.findOneAndUpdate({_id: message._id}, {powerState: message.powerState}, {new: true});
        DeviceEvent.create(EventController.deviceEvent('device.edited', updatedDevice));
    }
}
