/* ============================================
   PROJECT & PAST WORKS RENDERING
   ============================================ */

let currentProject = 0
const itemsPerPage = 4

function renderProjects() {
    const container = document.getElementById('project-grid')
    const nextItems = ProjectsData.slice(currentProject, currentProject + itemsPerPage)

    nextItems.forEach((item, i) => {
        const cardHTML = `
        <a href="${item.url}" class="project-card project-card-linked card-reveal" style="animation-delay:${i * 0.1}s" target="_blank" rel="noreferrer">
                        <div class="project-image">
                            <img src="${item.image}" alt="">
                        </div>
                        <div class="project-info">
                            <small>${item.header}</small>
                            <h3>
                                ${item.title}
                                <span>↗</span>
                            </h3>
                            <p>
                                ${item.desc}
                            </p>
                            <em>
                                ${item.footer}
                            </em>
                        </div>
                    </a>
        `
        container.insertAdjacentHTML('beforeend', cardHTML)
    })

    currentProject += itemsPerPage
}

renderProjects()

let currentPastWorks = 0
function renderPastWorks() {
    const container = document.getElementById('pastworks-grid')
    const btnShowMore = document.getElementById('show-more-btn')
    const nextItems = PastWorksData.slice(currentPastWorks, currentPastWorks + itemsPerPage)

    nextItems.forEach((item, i) => {
        const cardHTML = `
        <a href="${item.url}" class="project-card project-card-linked card-reveal" style="animation-delay:${i * 0.1}s" target="_blank" rel="noreferrer">
                        <div class="project-image">
                            <img src="${item.image}" alt="">
                        </div>
                        <div class="project-info">
                            <small>${item.header}</small>
                            <h3>
                                ${item.title}
                                <span>↗</span>
                            </h3>
                            <p>
                                ${item.desc}
                            </p>
                            <em>
                                ${item.footer}
                            </em>
                        </div>
                    </a>
        `
        container.insertAdjacentHTML('beforeend', cardHTML)
    })

    currentPastWorks += itemsPerPage

    if (currentPastWorks >= PastWorksData.length) {
        btnShowMore.style.display = 'none'
    }
}

renderPastWorks()

document.getElementById('show-more-btn').addEventListener('click', renderPastWorks)


/* ============================================
   SCROLL REVEAL — Intersection Observer
   ============================================ */

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            revealObserver.unobserve(entry.target)
        }
    })
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' })

function observeNewElements() {
    document.querySelectorAll('.reveal:not(.visible), .reveal-left:not(.visible), .reveal-scale:not(.visible)').forEach(el => {
        revealObserver.observe(el)
    })
}

function setupRevealClasses() {
    document.querySelectorAll('.resume-section').forEach((section, i) => {
        const h2 = section.querySelector('h2')
        if (h2) {
            h2.classList.add('reveal-left')
            h2.classList.add('stagger-1')
        }

        const prose = section.querySelectorAll('.prose, .about-layout, .ai-note, .service-columns, .delivery-panel, .terms-card, .contact-panel')
        prose.forEach((el, j) => {
            el.classList.add('reveal')
            if (j < 6) el.classList.add('stagger-' + (j + 2))
        })
    })

    observeNewElements()
}

setupRevealClasses()


/* ============================================
   STATS COUNTER ANIMATION
   ============================================ */

function animateCountUp(el, target, suffix) {
    suffix = suffix || ''
    const duration = 1200
    const start = performance.now()
    const isFloat = target % 1 !== 0

    function tick(now) {
        const elapsed = now - start
        const progress = Math.min(elapsed / duration, 1)
        const eased = 1 - Math.pow(1 - progress, 3)
        const current = isFloat
            ? (eased * target).toFixed(1)
            : Math.floor(eased * target)
        el.textContent = current + suffix
        if (progress < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
}

function setupStatsCounter() {
    const statsContainer = document.querySelector('.profile-stats')
    if (!statsContainer) return

    const statsData = [
        { value: 5, suffix: '' },
        { value: 3, suffix: 'M+' },
        { value: 5, suffix: '' },
        { value: 7, suffix: '+' },
    ]

    let animated = false

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animated = true
                const dtElements = statsContainer.querySelectorAll('dt')
                dtElements.forEach((dt, i) => {
                    if (statsData[i]) {
                        setTimeout(() => {
                            animateCountUp(dt, statsData[i].value, statsData[i].suffix)
                        }, i * 120)
                    }
                })
                observer.disconnect()
            }
        })
    }, { threshold: 0.5 })

    observer.observe(statsContainer)
}

setupStatsCounter()
