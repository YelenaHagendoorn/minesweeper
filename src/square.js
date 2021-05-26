'use strict';

class Square {

  constructor(x, y, isMine) {
    this.x = x;
    this.y = y;
    this.isMine = isMine;
    this.neighbours = [];
    this.activated = false;
    this.flagged = false;
    this.number = 0;
  }

  setNeighbours(neighbours) {
    this.neighbours = neighbours;
    this.number = neighbours.reduce((sum, neighbour) => neighbour.isMine ? ++sum : sum, 0);
  }

  activate() {
    if (this.activated || this.flagged) {
      return;
    }

    if (this.isMine) {
      alert('You have lost');
      return;
    }

    this.activated = true;
    this.element.setAttribute('activated', true);
    if (this.number === 0) {
      this.neighbours.forEach(neighbour => neighbour.activate());
    }
  }

  flag(event) {
  	event.preventDefault();

    if (this.activated) {
      return;
    }

    if (this.flagged) {
      this.element.removeAttribute('flagged');
    } else {
		this.element.setAttribute('flagged', true);
    }

    this.flagged = !this.flagged;
  }

  render() {
    const element = document.createElement('div');
    element.className = `square num${this.number}`;
    element.style.top = `${this.y * 24}px`;
    element.style.left = `${this.x * 24}px`;
    element.innerHTML = this.number;
    element.addEventListener('click', this.activate.bind(this));
    element.addEventListener('contextmenu', this.flag.bind(this));
    this.element = element;
    document.body.appendChild(element);
  }
}

export default Square
