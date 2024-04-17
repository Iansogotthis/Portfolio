const navMenu = document.getElementById('nav-menu');
const aboutCardsContainer = document.querySelector('.about-cards-container');

const navItems = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' }
];

const aboutCards = [
  {
    title: 'Experience',
    link: 'experience.html',
  },
  {
    title: 'Employment',
    link: 'employment.html',
  },
  {
    title: 'Education',
    link: 'education.html',
  },
  {
    title: 'Extras',
    link: 'extras.html',
  },
];

function renderNavMenu() {
  const navList = document.createElement('ul');

  navItems.forEach(item => {
    if ((window.location.pathname === '/index.html' || window.location.pathname === '/') || item.label === 'Home') {
      const navItem = document.createElement('li');
      const navLink = document.createElement('a');
      if (item.label === 'Home' && window.location.pathname !== '/index.html' && window.location.pathname !== '/') {
        navLink.href = '/index.html'; // Redirect to index.html for Home button on other pages
      } else {
        navLink.href = item.href;
      }
      navLink.textContent = item.label;
      navItem.appendChild(navLink);
      navList.appendChild(navItem);
    }
  });

  navMenu.appendChild(navList);
}

function createAboutCard(card) {
  const cardElement = document.createElement('div');
  cardElement.classList.add('about-card');

  const cardLink = document.createElement('a');
  cardLink.href = card.link;
  cardLink.textContent = card.title;

  cardElement.appendChild(cardLink);
  return cardElement;
}

function renderAboutCards() {
  if (aboutCardsContainer) {
    aboutCards.forEach((card) => {
      const cardElement = createAboutCard(card);
      aboutCardsContainer.appendChild(cardElement);
    });
  }
}

// Add smooth scrolling to navigation links on the home page
if (window.location.pathname === '/index.html' || window.location.pathname === '/') {
  document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const targetId = event.target.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      targetElement.scrollIntoView({ behavior: 'smooth' });
    });
  });
} else { // Route to sections on the home page from other pages
  document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', (event) => {
      event.preventDefault();
      const targetId = event.target.getAttribute('href');
      window.location.href = `/${targetId.substring(0)}`; // Remove the first character (#)
    });
  });
}

renderNavMenu();
renderAboutCards();