/* TOOGLE EVENT */
let projectIndex = 1;
showProjects(projectIndex);

// Thumbnail image controls
function currentproject(n) {
  showProjects((projectIndex = n));
}
function showProjects(n) {
  let projects = document.getElementsByClassName('project');
  let projectItems = document.getElementsByClassName('project-item');
  if (n > projects.length) {
    projectIndex = 1;
  }
  if (n < 1) {
    projectIndex = projects.length;
  }
  for (let i = 0; i < projects.length; i++) {
    projects[i].style.display = 'none';
  }
  for (i = 0; i < projectItems.length; i++) {
    projectItems[i].className = projectItems[i].className.replace(
      ' active',
      ''
    );
  }
  projects[projectIndex - 1].style.display = 'block';
  projectItems[projectIndex - 1].className += ' active';
}

/* TYPEWRITER ANIMATION */
class TypeWriter {
  constructor(txtElement, words, wait = 3000) {
    this.txtElement = txtElement;
    this.words = words;
    this.txt = 'dreams come true';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = true;
  }

  type() {
    // Current index of word
    const current = this.wordIndex % this.words.length;
    // Get full text of current word
    const fullTxt = this.words[current];

    // Check if deleting
    if (this.isDeleting) {
      // Remove char
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      // Add char
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    // Insert txt into element
    this.txtElement.innerHTML = `<span class="txt">${this.txt}</span>`;

    // Initial Type Speed
    let typeSpeed = 200;

    if (this.isDeleting) {
      typeSpeed /= 2;
    }

    // If word is complete
    if (!this.isDeleting && this.txt === fullTxt) {
      // Make pause at end
      typeSpeed = this.wait;
      // Set delete to true
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      typeSpeed = this.wait;
      // Move to next word
      this.wordIndex++;
      // Pause before start typing
      typeSpeed = 200;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}

// Init On DOM Load
document.addEventListener('DOMContentLoaded', init);

// Init App
function init() {
  const txtElement = document.querySelector('.txt-type');
  const words = JSON.parse(txtElement.getAttribute('data-words'));
  const wait = txtElement.getAttribute('data-wait');
  // Init TypeWriter
  new TypeWriter(txtElement, words, wait);
}
