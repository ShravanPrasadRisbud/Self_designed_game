Body.setStatic = function(body, isStatic) {
    for (var i = 0; i < body.parts.length; i++) {
        var part = body.parts[i];
        part.isStatic = isStatic;

        if(isStatic){
            part._original = {
                restitution: part.restitution,
                friction: part.friction,
                mass: part.mass,
                inertia: part.inertia,
                density: part.density,
                inverseMass: part.inverseMass,
                inverseInertia: part.inverseInertia
            };

            part.restitution = 0;
            part.friction = 1;
            part.mass = part.inertia = part.density = Infinty;
            part.inverseMass = part.inverseInertia = 0;

            part.positionPrev.x = part.position.x;
            part.positionPrev.y = part.position.y;
            part.anglePrev = part.angle;
            part.angularVelocity = 0;
            part.speed = 0;
            part.angularSpeed = 0;
            part.motion = 0;
        }else if (part._original) {
            part.restitution = part._original.restitution;
            part.friction = part._original.friction;
            part.mass = part._original.mass;
            part.inertia = part._original.inertia;
            part.density = part._original.density;
            part.inverseMass = part._original.inverseMass;
            part.inverseInertia = part._original.inverseInertia;

            delete part._original;
        }
    }
};

Body.set = function(body, settings, value) {
    var property;

    if (typeof settings === 'string') {
        property = settings;
        settings = {};
        settings[property] = value;
    }

    for (property in settings) {
        value = settings[property];

        if (!settings.hasOwnProperty(property))
            continue;

        switch (property) {

        case 'isStatic':
            Body.setStatic(body, value);
            break;
        case 'isSleeping':
            Sleeping.set(body, value);
            break;
        case 'mass':
            Body.setMass(body, value);
            break;
        case 'density':
            Body.setDensity(body, value);
            break;
        case 'inertia':
            Body.setInertia(body, value);
            break;
        case 'vertices':
            Body.setVertices(body, value);
            break;
        case 'position':
            Body.setPosition(body, value);
            break;
        case 'angle':
            Body.setAngle(body, value);
            break;
        case 'velocity':
            Body.setVelocity(body, value);
            break;
        case 'angularVelocity':
            Body.setAngularVelocity(body, value);
            break;
        case 'parts':
            Body.setParts(body, value);
            break;
        default:
            body[property] = value;

        }
    }
};