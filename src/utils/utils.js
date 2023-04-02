
export const filterBySellectedProjects = (task, sellectedProjects) => {
    if (sellectedProjects) {
        return sellectedProjects?.includes(task?.project?.projectName)
    }

    return true;
}

export const filterBySearch = (task, search) => {
    if (search) {
        return task?.taskName?.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    }

    return true;
}

// find team member data by his name 
export const findTeamMember = (memberName, team=[]) => {
    const member = team?.find(m => m.name === memberName)
    return member
}
// find Project data by project name 
export const findProject = (projectName, projects=[]) => {
    const project = projects?.find(p => p.projectName === projectName)
    return project
}

// genarate id for new task 
export const getId = (tasks) => {
    const maxId = tasks.reduce((maxId, task) => Math.max(maxId, parseInt(task.id)), 0);
    return maxId + 1;
}