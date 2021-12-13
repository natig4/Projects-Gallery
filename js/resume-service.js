'use strict';

var gProjects;

var gId = 1;

function _createProject(name, title, desc, url, publishedAt, labels) {
    return {
        id: gId++,
        name: name,
        title: title,
        desc: desc,
        url: url,
        publishedAt: publishedAt,
        labels: labels,
    };
}

function createProjects() {
    var proj1 = _createProject(
        'Touch nums',
        'Count those nums',
        '',
        'img/portfolio/Touchnums.jpg',
        Date.now(), ['Matrixes', 'keyboard events']
    );
    var proj2 = _createProject(
        'Game of life',
        'The never ending game',
        '',
        'img/portfolio/gameoflife.jpg',
        Date.now(), ['Matrixes', 'keyboard events']
    );
    var proj3 = _createProject(
        'Pacman',
        'The classic',
        '',
        'img/portfolio/pacman.jpg',
        Date.now(), ['Matrixes', 'keyboard events']
    );
    var proj4 = _createProject(
        'Minesweeper',
        'Classic with a polished style',
        '',
        'img/portfolio/shola.jpg',
        Date.now(), ['Matrixes', 'keyboard events']
    );
    var proj5 = _createProject(
        'Safe content',
        'Login page with restricted content',
        '',
        'img/portfolio/safecontent.jpg',
        Date.now(), ['Matrixes', 'keyboard events']
    );

    gProjects = [proj1, proj2, proj3, proj4, proj5];
}

function getProjectById(projectId) {
    var project = gProjects.find(function(project) {
        return projectId === project.id
    })
    return project
}

function getProjects() {
    return gProjects;
}