'use strict';

$(onInitPage);


function onInitPage() {
    createProjects();
    renderProjects();
    $('.btn-submit').click(onSendEmail);
}

function renderProjects() {
    const projects = getProjects();
    const strHtmls = projects.map(function(project, idx) {
        return `
      <div class="col-md-4 col-sm-6 portfolio-item">
        <a class="portfolio-link" data-toggle="modal" href="#portfolioModal${
          idx + 1
        }" 
        onclick="onOpenModal(${idx})">
          <div class="portfolio-hover">
            <div class="portfolio-hover-content">
              <i class="fa fa-plus fa-3x"></i>
            </div>
          </div>
          <img class="img-fluid" src="${project.url}">
        </a>
        <div class="portfolio-caption">
          <h4>${project.name}</h4>
          <p class="text-muted">${project.title}</p>
        </div>
      </div>`;
    });
    $('.projects-container').html(strHtmls);
}

function onOpenModal(idx) {
    const projects = getProjects();
    const project = projects[idx];
    renderModal(idx, project);
}

function renderModal(idx, project) {
    const date = new Date(project.publishedAt);
    const month = date.toLocaleString('en-us', { month: 'long' });
    const year = date.getFullYear();
    const strHtml = `
<div class="portfolio-modal modal fade" id="portfolioModal${
  ++idx 
}" tabindex="-1" role="dialog" aria-hidden="true">
<div class="modal-dialog">
  <div class="modal-content">
    <div class="close-modal" data-dismiss="modal">
      <div class="lr">
        <div class="rl"></div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-lg-8 mx-auto">
          <div class="modal-body">
            <!-- Project Details Go Here -->
            <h2>${project.name}</h2>
            <p class="item-intro text-muted">${project.title}</p>
            <img class="img-fluid d-block mx-auto" src="${
              project.url
            }" alt="">
            <p>${project.desc}</p>
            <ul class="list-inline">
              <li>Date: ${month + ' ' + year}</li>
            </ul>
            <button class="btn btn-primary" data-dismiss="modal" type="button">
                <i class="fa fa-times"></i>
                Close Project</button>
            <button class="btn btn-info" type="button" onclick="onOpenProject(${idx})">
                <i class="fa fa-info"></i>
                Check it out</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</div>`;

    $('body').append(strHtml);
}

function onOpenProject(idx) {
    window.open('https://google.com', '_blank');
}

function onSendEmail(ev) {
    ev.preventDefault();
    if ($('#inputEmail').val() === '' ||
        $('#inputSubject').val() === '' ||
        $('#inputMessage').val() === '') return
    const email = $('#inputEmail').val();
    const subject = $('#inputSubject').val();
    const message = $('#inputMessage').val();

    const url = `https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=${subject}&body=${message}`;
    window.open(url, '_blank');
    $('#inputEmail').val('');
    $('#inputSubject').val('');
    $('#inputMessage').val('');
}