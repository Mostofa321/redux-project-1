import React from 'react';
import { useGetTeamQuery } from '../../../features/team/teamApi';

const Team = () => {
    const {
        data: team,
        isLoading,
        isError,
        error,
    } = useGetTeamQuery();

    return (
        <div className="mt-8">
            <h3 className="text-xl font-bold">Team Members</h3>
            <div className="mt-3 space-y-4">
                {
                    team?.map(membar => {
                        const {id, name, avatar} = membar || {};
                        return (
                            <div key={id} className="checkbox-container">
                                <img src={avatar} className="team-avater" alt='avater' />
                                <p className="label">{name}</p>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    );
};

export default Team;