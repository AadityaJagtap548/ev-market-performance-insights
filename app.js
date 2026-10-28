(() => {
  const views = {
    dashboard: {
      url: 'https://public.tableau.com/views/EV_Market_Insightsw33/Dashboard1?:language=en-US&publish=yes',
      description: 'A multi-angle overview of EV categories, sales, manufacturers, geography, ratings and battery performance.'
    },
    story: {
      url: 'https://public.tableau.com/views/EV_Market_Insights_17932119822480/Story1?:language=en-US&publish=yes',
      description: 'A guided sequence through the market overview, annual sales, category mix, battery mix, customer ratings and manufacturer sales.'
    }
  };

  const tabs = [...document.querySelectorAll('.view-tab')];
  const panels = [...document.querySelectorAll('.viz-panel')];
  const openLink = document.querySelector('#open-view');
  const description = document.querySelector('#view-description');

  function setView(name) {
    const view = views[name];
    if (!view) return;
    tabs.forEach((tab) => {
      const active = tab.dataset.view === name;
      tab.classList.toggle('is-active', active);
      tab.setAttribute('aria-selected', String(active));
      tab.tabIndex = active ? 0 : -1;
    });
    panels.forEach((panel) => {
      const active = panel.id === `panel-${name}`;
      panel.hidden = !active;
      panel.classList.toggle('is-active', active);
    });
    openLink.href = view.url;
    description.textContent = view.description;
    history.replaceState(null, '', `#explore-${name}`);
  }

  tabs.forEach((tab) => tab.addEventListener('click', () => setView(tab.dataset.view)));
  document.querySelectorAll('[data-switch]').forEach((link) => {
    link.addEventListener('click', () => setView(link.dataset.switch));
  });
  document.querySelector('.view-tabs').addEventListener('keydown', (event) => {
    if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    event.preventDefault();
    const current = tabs.findIndex((tab) => tab.getAttribute('aria-selected') === 'true');
    const next = tabs[(current + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length];
    setView(next.dataset.view);
    next.focus();
  });

  if (location.hash === '#explore-story') setView('story');
})();

