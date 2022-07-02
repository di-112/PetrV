import React, {useEffect} from 'react';
import styles from './style.less'
import {Flex, IconButton, Menu, MenuButton, MenuItem, MenuList,} from '@chakra-ui/react'
import {HamburgerIcon} from '@chakra-ui/icons'
import {useStore} from "../../store/provider";
import RedmineClient from "../../taskManagers/RedmineClient";
import {observer} from "mobx-react-lite";
import {useLocation, useNavigate} from 'react-router-dom'

const Header = () => {
    const { token, me, setMe } = useStore()

    const navigate = useNavigate()

    const location = useLocation()


    useEffect( ()=>{
        const fetchMe = async () => {
            const client = new RedmineClient(token)
            const data =  await client.getMe()
            if(data) {
                setMe(data)
            }
        }
        fetchMe()
    },[])

    return (
        <Flex className={styles.menu}>
                <Menu key={'test'}>
                    <MenuButton
                        as={IconButton}
                        className={styles.burger}
                        aria-label='Options'
                        variant={'solid'}
                        icon={<HamburgerIcon color={'white'}/>}
                        _hover={{ bg: 'blue.400' }}
                        _expanded={{ bg: 'blue.400' }}
                        _focus={{ boxShadow: 'none', bg: 'inherit' }}
                    />
                    <MenuList className={styles.list} >
                        <MenuItem
                            onClick ={() => {navigate('/')}}
                            className={location.pathname === '/' ? styles.active : null}
                        >
                            Задачи
                        </MenuItem>
                        <MenuItem
                            onClick ={() => { navigate('/plans')}}
                            className={location.pathname === '/plans' ? styles.active : null}
                        >
                            Планирование
                        </MenuItem>
                        <MenuItem>
                            Итоги
                        </MenuItem>
                        <MenuItem>
                            Настройки
                        </MenuItem>
                    </MenuList>
                </Menu>
            <div className={styles.buttons}>
                {me?.login}
            </div>
        </Flex>
    );
};

export default observer(Header);