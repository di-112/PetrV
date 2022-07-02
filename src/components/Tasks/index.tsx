import React, {useEffect, useState} from 'react';
import styles from './style.less'
import {useStore} from "../../store/provider";
import RedmineClient from "../../taskManagers/RedmineClient";
import {observer} from "mobx-react-lite";
import {ITasks} from "../../taskManagers/types";

const Tasks = () => {
    const { token } = useStore()

    const [tasks, setTasks] = useState<ITasks[]>([])

    useEffect( ()=>{
        const fetchPlans = async () => {
            const client = new RedmineClient(token)
            const data =  await client.getIssuesForPlan()
            if(data) {
                setTasks(data)
            }
            console.log('plans: ', data)
        }
        fetchPlans()
    },[])

    return (
        <div >
          <h1>Задачи</h1>
            <div className={styles.tasks}>
                {tasks.map(task => (
                    <div className={styles.task}>
                        - <span className={styles.name}>{task.id}.{task.tracker_name}</span> - {task.subject}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default observer(Tasks);