import React, { useEffect, useState } from 'react';
import { useGetProjectsQuery } from '../../features/projects/projectApi';
import { useGetTeamQuery } from '../../features/team/teamApi';
import { useNavigate, useParams } from 'react-router-dom';
import { useEditTaskMutation, useGetTasksQuery } from '../../features/tasks/tasktsApi';
import { findProject, findTeamMember } from '../../utils/utils';

const EditTask = () => {
    const { id } = useParams();
    const navigate = useNavigate()

    // edit 
    const [editTask, { isSuccess }] = useEditTaskMutation();
    useEffect(() => {
        if(isSuccess){
            navigate('/')
        }
    },[isSuccess, navigate])

    // get projects 
    const {
        data: projects,
    } = useGetProjectsQuery();

    // get team
    const {
        data: team,
    } = useGetTeamQuery();

    // all task
    const {
        data: tasks,
    } = useGetTasksQuery();

    // task for edit 
    const task = tasks?.find(task => task.id === parseInt(id))
    const { id: taskId, taskName, project, teamMember, status, deadline } = task || {};

    // local states for store form input values 
    const [newTaskName, setNewTaskName] = useState("");
    const [newMemberName, setNewMemberName] = useState("");
    const [newProjectName, setNewProjectName] = useState("");
    const [newDeadline, setNewDeadline] = useState("");

    // submit handler 
    const handleSubmit = (e) => {
        e.preventDefault();
        editTask({
            id,
            data: {
                ...task,
                taskName: newTaskName ? newTaskName : taskName,
                teamMember: findTeamMember(newMemberName ? newMemberName : teamMember?.name, team),
                project: findProject(newProjectName ? newProjectName : project?.projectName, projects),
                deadline: newDeadline ? newDeadline : deadline,
            }
        })
    }


    return (
        <div className="container relative">
            <main className="relative z-20 max-w-3xl mx-auto rounded-lg xl:max-w-none">
                <h1 className="mt-4 mb-8 text-3xl font-bold text-center text-gray-800">
                    Edit Task For Your Team
                </h1>

                <div className="justify-center mb-10 space-y-2 md:flex md:space-y-0">
                    {
                        task && <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="fieldContainer">
                                <label htmlFor="lws-taskName">Task Name</label>
                                <input
                                    type="text"
                                    name="taskName"
                                    id="lws-taskName"
                                    required
                                    placeholder="Implement RTK Query"
                                    defaultValue={taskName}
                                    onChange={(e) => setNewTaskName(e.target.value)}
                                />
                            </div>

                            <div className="fieldContainer">
                                <label>Assign To</label>
                                <select onChange={(e) => setNewMemberName(e.target.value)} name="teamMember" defaultValue={teamMember?.name} id="lws-teamMember" required>
                                    {
                                        team?.map(teamMember => <option key={teamMember?.id}>{teamMember?.name}</option>)
                                    }
                                </select>
                            </div>
                            <div className="fieldContainer">
                                <label htmlFor="lws-projectName">Project Name</label>
                                <select onChange={(e) => setNewProjectName(e.target.value)} id="lws-projectName" defaultValue={project?.projectName} name="projectName" required>
                                    {
                                        projects?.map(project => <option key={project?.id}>{project?.projectName}</option>)
                                    }
                                </select>
                            </div>

                            <div className="fieldContainer">
                                <label htmlFor="lws-deadline">Deadline</label>
                                <input onChange={(e) => setNewDeadline(e.target.value)} type="date" defaultValue={deadline} name="deadline" id="lws-deadline" required />
                            </div>

                            <div className="text-right">
                                <button type="submit" className="lws-submit">Save</button>
                            </div>
                        </form>
                    }
                </div>
            </main>
        </div>
    );
};

export default EditTask;