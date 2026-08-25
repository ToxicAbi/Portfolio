let currentProject = 0
const itemsPerPage = 4

function renderProjects() {
    const container = document.getElementById('project-grid')

    const nextItems = ProjectsData.slice(currentProject, currentProject + itemsPerPage)

    console.log(nextItems)

    nextItems.forEach(item => {
        const cardHTML = `
        <a href="${item.url}" class="project-card project-card-linked" target="_blank" rel="noreferrer">
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

    nextItems.forEach(item => {
        const cardHTML = `
        <a href="${item.url}" class="project-card project-card-linked" target="_blank" rel="noreferrer">
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