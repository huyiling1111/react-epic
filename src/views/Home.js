import React from 'react';
import { observer } from 'mobx-react';
import { useStores } from '../stores';
import Uploader from '../components/Uploader';

const Home = observer(() => {
    const { UserStore } = useStores();

    const User = () => <div>Hello {UserStore.currentUser.attribures.username} </div>

    return (
        <>
            {
                UserStore.currentUser ? <>
                    Hello {UserStore.currentUser.attributes.username}
                </> :<>
                    用户未登录
                </>

            }

            <Uploader />
        </>
    );
});

export default Home;