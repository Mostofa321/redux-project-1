import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux'
import { selectedProjects } from '../../../features/filter/filterSlice';
import { useGetProjectsQuery } from '../../../features/projects/projectApi';

const Projects = () => {
    const dispatch = useDispatch();
    const {
        data: projects,
        isLoading,
        isError,
        error,
    } = useGetProjectsQuery();

    const [sellectedProject, setSellectedProject] = useState("");
    useEffect(()=> {
        dispatch(selectedProjects(sellectedProject))
    },[dispatch, sellectedProject])
    return (
        <div>
            <h3 className="text-xl font-bold">Projects</h3>
            <div className="mt-3 space-y-4">
                {
                    projects?.map(project => {
                        const {id, projectName, colorClass} = project
                        return (
                            <div key={id} className="checkbox-container">
                                <input onChange={(e) => setSellectedProject({[projectName]: e.target.checked})} type="checkbox" className={`${colorClass}`} defaultChecked />
                                <p className="label">{projectName}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default Projects;