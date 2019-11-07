"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bee_queue_1 = __importDefault(require("bee-queue"));
const cancellationMail_1 = __importDefault(require("../app/jobs/cancellationMail"));
const redis_1 = __importDefault(require("../config/redis"));
const jobs = [cancellationMail_1.default];
class Queue {
    constructor() {
        this.queues = {};
        this.queues = {};
        this.init();
    }
    init() {
        jobs.forEach(({ key, handle }) => {
            this.queues[key] = {
                bee: new bee_queue_1.default(key.toString(), {
                    redis: redis_1.default,
                }),
                handle,
            };
        });
    }
    add(queue, job) {
        return this.queues[queue].bee.createJob(job).save();
    }
    processQueue() {
        jobs.forEach(job => {
            const { bee, handle } = this.queues[job.key];
            bee.on('failed', this.handleFailure).process(handle);
        });
    }
    handleFailure(job, err) {
        console.error(`Queue ${job.queue.name}: Failled UwU `, err);
    }
}
exports.default = new Queue();
//# sourceMappingURL=Queue.js.map