import AABB from './aabb';
import Victor from 'victor';

export default class PhysicsBody {
    constructor(aabb) {
        this.aabb = aabb;
        this.velocity = Victor(0,0);//[units/s on x-axis, units/s on y-axis]
        this.accel = Victor(0,0);// Victor {x: u/(s^2), y: u/(s^2)}
        this.inView = false;
    }

    get x() {
        return this.aabb.lowerLeft.x;
    }

    get y() {
        return this.aabb.lowerLeft.y;
    }

    get w() {
        return this.aabb.width;
    }

    get h() {
        return this.aabb.height;
    }

    clone() {
        const returnBody = new PhysicsBody (new AABB(this.lowerLeft.clone(), this.upperRight.clone()), new Victor(this.x, this.y));
        returnBody.velocity = this.velocity.clone();
        returnBody.accel = this.accel.clone();
        returnBody.inVew = this.inView;

        return returnBody;
    }
}
