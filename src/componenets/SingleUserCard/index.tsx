import React from 'react';

interface userProps {
    item: {
        avatarUrl: any;
        name: string,
        login: string,
        url: string,
        followers: {
            totalCount: number
        },
        following: {
            totalCount: number
        },
        repositories: {
            totalCount: number
        }
    }
}

const SingleUserCard: React.FC<userProps> = ({item}) => {

    const {name, login, url} = item;

    return (
        <div className="card">
            <div className="content">
                <div>
                    <p className="name"><a href={url} target={'_blank'} rel="noreferrer">{name}</a></p>
                    <p className="userName">{login}</p>
                </div>
            </div>
        </div>
    )
}

export default SingleUserCard;