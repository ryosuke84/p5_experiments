
class Collider {
    
    static collides(object, targets) {
        const objPosition = object.getPosition();
        for(const target of targets) {
            const targetPosition = target.getPosition();
            if (objPosition.equals(targetPosition)) {
                return true;
            }
        }
        return false;
    }
}

export default Collider;