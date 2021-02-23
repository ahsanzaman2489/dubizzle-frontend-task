import React from 'react';
import styles from './SingleUserCard.module.scss';
import moment from 'moment';

interface userProps {
    item: {
        name: string,
        createdAt: string,
        files: [{
            name: string
            encoding: string,
            language: {
                color: string,
                name: string
            },
            extension: string
        }],
        forks: {
            nodes: [{
                owner: {
                    avatarUrl: string
                    login: string,
                    url: string
                }
            }]
        }
        description: string,
        url: string,

    }
}

const SingleUserCard: React.FC<userProps> = ({item}) => {
    const {name, createdAt, files, forks, url, description} = item;
    return (
        <div className={styles.card}>
            <div className={styles.content}>

                <div>
                    <p className={styles.name}><a href={url} target={'_blank'} rel="noreferrer">{name}</a></p>
                    <p className={styles.userName}>{description}</p>
                    <p className={styles.createdAt}>{moment(createdAt).format('DD/MM/YYYY')}</p>
                </div>

                {files.length && <div className={styles.files}>
                    <h3>files</h3>
                    <ul>
                        {files.map((file, index) =>
                            <li key={index}><span className={styles.languageColor}
                                                  style={{background: file.language?.color || 'rgb(38 227 70)'}}/>
                                <span title={file.extension}>&nbsp;{file.name}&nbsp;({file.encoding})</span></li>
                        )}
                    </ul>
                </div>}

                {forks.nodes.length > 0 && <div className={styles.forks}>
                    <h3>forks</h3>
                    <ul>
                        {forks.nodes.map((fork, index) =>
                            <li key={index}>
                                <a href={fork.owner.url} target={'_blank'}>
                                    <div className={styles.avatar}>
                                        <img src={fork.owner.avatarUrl} alt={fork.owner.avatarUrl}/>
                                    </div>
                                    <p>{fork.owner.login}</p>
                                </a>
                            </li>
                        )}
                    </ul>
                </div>}
            </div>
        </div>
    )
}

export default SingleUserCard;