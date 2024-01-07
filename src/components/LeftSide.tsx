// import React from 'react';
// import { Outlet, useNavigate } from 'react-router-dom';

// import { useAppSelector } from '../hooks';
// import { Storage } from '../service/LocalStorage';
// import { socket } from '../service/socket';
// import Connections from './Connections';
// import FriendModal from './FriendModal';
// import LeftMenu from './LeftMenu';

// // import CallModal from './CallModal';

// export default function LeftSide() {
//     const key = Storage.Get("key")
//     const naviagte = useNavigate()
//     const { id } = useAppSelector(state => state.socketId)
//     // const { isBoxOpen } = useAppSelector(state => state.friendBox)
//     // const { isOpenCallModal } = useAppSelector(state => state.openCallModal)
//     React.useEffect(() => {
//         if (!key) {
//             naviagte("../")
//         }
//     }, [key, naviagte])
//     React.useEffect(() => {
//         socket.auth = { id: key || id }
//         socket.connect()
//         socket.on("connect", () => {
//             console.log(`connect ${socket.id}`);
//         });
//         socket.on("disconnect", () => {
//             console.log(`disconnect`);
//         });
//         socket.on("connect_error", (err) => {
//             console.log(err);
//         });
//         return () => {
//             socket.disconnect()
//             socket.off("disconnect")
//             socket.off("connect")
//             socket.off("connect_error")
//         }
//     }, [id, key])

//     // if (isBoxOpen) {
//     //     return (
//     //         <>
//     //             <section className='flex h-screen w-full items-center justify-center maxw relative' >
//     //                 <div className='flex flex-col  w-full h-full drop-shadow-xl'>
//     //                     <div className='flex relative w-full h-full main-windows [&>*:not(:first-child)]:border-l-2  rounded-b-2xl bg-white py-4'>
//     //                         <LeftMenu />
//     //                         <Conversations />
//     //                         <Outlet />
//     //                     </div>
//     //                 </div>
//     //             </section >
//     //             <FriendModal />
//     //         </>

//     //     )
//     // }
//     return (<>
//         <section className='flex h-screen w-full items-center justify-center maxw relative' >
//             <div className='flex flex-col  w-full h-full drop-shadow-xl'>
//                 <div className='flex relative w-full h-full main-windows [&>*:not(:first-child)]:border-l-2  rounded-b-2xl bg-white py-4'>
//                     <LeftMenu />
//                     <Connections />
//                     <Outlet />
//                 </div>
//             </div>
//         </section >
//         <FriendModal />
//         {/* {!isOpenCallModal && <CallModal mode='video' />} */}
//     </>
//     )
// }
