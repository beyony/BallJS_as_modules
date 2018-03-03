import Ball from './class.ball';
import BallCollection from './class.BallCollection';
import CANVAS from './module.canvas';



var ballCollection = new BallCollection();
ballCollection.addMutiple(300);
ballCollection.setLeader(CANVAS.getCenter());


let mainInterval = setInterval(() => {
    ballCollection.process();
    ballCollection.drawAll();
}, 30);



window.addEventListener('click', (e) => {
    ballCollection.setPosition({
        x: e.clientX,
        y: e.clientY
    });
    ballCollection.spark(1000);
});