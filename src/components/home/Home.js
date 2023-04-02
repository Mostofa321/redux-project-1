import React from 'react';
import { useGetTasksQuery } from '../../features/tasks/tasktsApi';
import Projects from './aside/Projects';
import Team from './aside/Team';
import TaskList from './TaskList';
import { useSelector } from 'react-redux';
import { filterBySearch, filterBySellectedProjects } from '../../utils/utils';
import { Link } from 'react-router-dom';

const Home = () => {
    const filters = useSelector(state => state.filters);
    const {
        data: tasks,
        isLoading,
        isError,
        error,
    } = useGetTasksQuery();


    // filtering data by search and sellectedProjects 
    const { search, sellectedProjects } = useSelector(state => state.filters);
    const filtered = tasks?.filter((task) => filterBySellectedProjects(task, sellectedProjects))?.filter((task) => filterBySearch(task, search));
    return (
        <div className="text-[#111827]">
            <div className="container relative">
                <div className="sidebar">
                    {/* Projects List */}
                    <Projects />

                    {/* Team Members */}
                    <Team />
                </div>

                <div className="lg:pl-[16rem] 2xl:pl-[23rem]">
                    <main className="relative z-20 max-w-3xl mx-auto rounded-lg xl:max-w-none">
                        <div className="justify-between mb-10 space-y-2 md:flex md:space-y-0">
                            <Link to="/addTask" className="lws-addnew group">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                    stroke="currentColor" className="w-6 h-6 group-hover:text-indigo-500">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                </svg>

                                <span className="group-hover:text-indigo-500">Add New</span>
                            </Link>
                        </div>

                        <div className="lws-task-list">
                            {
                                filtered?.map(task => <TaskList key={task.id} task={task} />)
                            }

                        </div>
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Home;