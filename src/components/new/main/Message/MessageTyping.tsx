import clsx from 'clsx'
import React from 'react'

const MessageTyping = () => {
    const [isTyping, setIsTyping] = React.useState<boolean>(false)
    React.useEffect(() => {
        const interval = setInterval(() => {
            setIsTyping(prev => !prev)
        }, 2000)
        return () => clearInterval(interval)
    }, [])
    return (
        <>
            <div className={clsx('w-full', isTyping ? "block" : "hidden")}>
                <div className='flex items-center ml-64 gap-4'>
                    <div className='rounded-full w-14 h-14 overflow-hidden  '>
                        <img src={"https://d3lugnp3e3fusw.cloudfront.net/"} alt='' className='w-full h-full' />
                    </div>
                    <div className={clsx('bg-blue-50 rounded-lg p-4 flex items-center gap-1 ')}>
                        <div className='animate-dot-flashing-linear w-2 h-2 rounded-full bg-gray-500 relative text-gray-500 delay-0'></div>
                        <div className='animate-dot-flashing w-2 h-2 rounded-full bg-gray-200 relative text-gray-500 delay-500'></div>
                        <div className='animate-dot-flashing w-2 h-2 rounded-full bg-gray-400 relative text-gray-500 delay-1000'></div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default React.memo(MessageTyping)

export const mockMessages: {
    messageId: string;
    conversationId: string;
    message: {
        type: 'text' | "location" | "image" | "file" | "video" | "link";
        content: string;
    }[];
    sender?: string | undefined;
    recipients: string[];
    isDeleted: boolean;
    createdAt: string;
    group: string;
}[] = [
        {
            "messageId": "760e2e83-47d3-4ed3-b119-c2638037098f",
            "conversationId": "a3730a54-8e05-42db-9092-1b3d91775cc2",
            "message": [
                {
                    "type": "text",
                    "content": "Sep 2 2023 7h34"
                }
            ],
            "recipients": [
                "fee3e911-4060-47bc-9649-5cfb83961b0c",
                "0df1ab3a-d905-45b0-a4c1-9e80ed660010"
            ],
            "isDeleted": false,
            "createdAt": "1693614895000",
            "group": "1693587600000"
        },
        {
            "messageId": "a64b2d8a-d4f1-405e-b9bc-d91fc607c1cc",
            "conversationId": "a3730a54-8e05-42db-9092-1b3d91775cc2",
            "message": [
                {
                    "type": "text",
                    "content": "Hello"
                }
            ],
            "recipients": [
                "fee3e911-4060-47bc-9649-5cfb83961b0c",
                "0df1ab3a-d905-45b0-a4c1-9e80ed660010"
            ],
            "isDeleted": false,
            "createdAt": "1693640094000",
            "group": "1693587600000"
        },
        {
            "messageId": "9a7f547c-b0fd-44ca-ae94-e4e05c38d4be",
            "conversationId": "a3730a54-8e05-42db-9092-1b3d91775cc2",
            "message": [
                {
                    "type": "text",
                    "content": "Hello"
                }
            ],
            "recipients": [
                "fee3e911-4060-47bc-9649-5cfb83961b0c",
                "0df1ab3a-d905-45b0-a4c1-9e80ed660010"
            ],
            "isDeleted": false,
            "createdAt": "1693725966131",
            "group": "1693674000000"
        },
        {
            "messageId": "654ebcf4-f4ee-456b-8c35-0313fe3d751e",
            "conversationId": "a3730a54-8e05-42db-9092-1b3d91775cc2",
            "message": [
                {
                    "type": "text",
                    "content": "Sep 4 2023 7h56"
                }
            ],
            "sender": "0df1ab3a-d905-45b0-a4c1-9e80ed660010",
            "recipients": [
                "fee3e911-4060-47bc-9649-5cfb83961b0c",
                "0df1ab3a-d905-45b0-a4c1-9e80ed660010"
            ],
            "isDeleted": false,
            "createdAt": "1693832202000",
            "group": "1693760400000"
        },
        {
            "messageId": "e264deab-3bbd-4998-81c6-08f1edbf1827",
            "conversationId": "a3730a54-8e05-42db-9092-1b3d91775cc2",
            "message": [
                {
                    "type": "text",
                    "content": "a"
                }
            ],
            "recipients": [
                "fee3e911-4060-47bc-9649-5cfb83961b0c",
                "0df1ab3a-d905-45b0-a4c1-9e80ed660010"
            ],
            "isDeleted": false,
            "createdAt": "1693842232098",
            "group": "1693760400000"
        },
        {
            "messageId": "b539d238-97bb-4f2e-afca-aae9b88e1d96",
            "conversationId": "a3730a54-8e05-42db-9092-1b3d91775cc2",
            "message": [
                {
                    "type": "text",
                    "content": "hello afternoon"
                }
            ],
            "recipients": [
                "fee3e911-4060-47bc-9649-5cfb83961b0c",
                "0df1ab3a-d905-45b0-a4c1-9e80ed660010"
            ],
            "isDeleted": false,
            "createdAt": "1693842427092",
            "group": "1693760400000"
        },
        {
            "messageId": "62a895bc-71d1-4a31-9874-bb17a21ac72d",
            "conversationId": "a3730a54-8e05-42db-9092-1b3d91775cc2",
            "message": [
                {
                    "type": "text",
                    "content": "here"
                }
            ],
            "recipients": [
                "fee3e911-4060-47bc-9649-5cfb83961b0c",
                "0df1ab3a-d905-45b0-a4c1-9e80ed660010"
            ],
            "isDeleted": false,
            "createdAt": "1693843159693",
            "group": "1693760400000"
        },
        {
            "messageId": "19ffb853-c7b3-476c-a047-733b26b69437",
            "conversationId": "a3730a54-8e05-42db-9092-1b3d91775cc2",
            "message": [
                {
                    "type": "text",
                    "content": "last"
                }
            ],
            "recipients": [
                "fee3e911-4060-47bc-9649-5cfb83961b0c",
                "0df1ab3a-d905-45b0-a4c1-9e80ed660010"
            ],
            "isDeleted": false,
            "createdAt": "1693843398732",
            "group": "1693760400000"
        },
        {
            "messageId": "445addfb-88bd-4485-8c8c-24bc132a48cf",
            "conversationId": "a3730a54-8e05-42db-9092-1b3d91775cc2",
            "message": [
                {
                    "type": "text",
                    "content": "last"
                }
            ],
            "recipients": [
                "fee3e911-4060-47bc-9649-5cfb83961b0c",
                "0df1ab3a-d905-45b0-a4c1-9e80ed660010"
            ],
            "isDeleted": false,
            "createdAt": "1693843688294",
            "group": "1693760400000"
        },
        {
            "messageId": "7d35b086-f5e1-438a-9adb-1ebe79f8cf4f",
            "conversationId": "a3730a54-8e05-42db-9092-1b3d91775cc2",
            "message": [
                {
                    "type": "text",
                    "content": "hello"
                }
            ],
            "recipients": [
                "fee3e911-4060-47bc-9649-5cfb83961b0c",
                "0df1ab3a-d905-45b0-a4c1-9e80ed660010"
            ],
            "isDeleted": false,
            "createdAt": "1693843785452",
            "group": "1693760400000"
        },
        {
            "messageId": "cf7a50c1-d9c6-459f-a7ad-e443e06eea1b",
            "conversationId": "a3730a54-8e05-42db-9092-1b3d91775cc2",
            "message": [
                {
                    "type": "text",
                    "content": "na oi"
                }
            ],
            "recipients": [
                "fee3e911-4060-47bc-9649-5cfb83961b0c",
                "0df1ab3a-d905-45b0-a4c1-9e80ed660010"
            ],
            "isDeleted": false,
            "createdAt": "1693843888633",
            "group": "1693760400000"
        },
        {
            "messageId": "519fbce4-c0a7-4ceb-a167-409144ab4b5b",
            "conversationId": "a3730a54-8e05-42db-9092-1b3d91775cc2",
            "message": [
                {
                    "type": "text",
                    "content": "23: 13"
                }
            ],
            "recipients": [
                "fee3e911-4060-47bc-9649-5cfb83961b0c",
                "0df1ab3a-d905-45b0-a4c1-9e80ed660010"
            ],
            "isDeleted": false,
            "createdAt": "1693844016725",
            "group": "1693760400000"
        },
        {
            "messageId": "abbca253-66c6-439d-b516-59421c1922a8",
            "conversationId": "a3730a54-8e05-42db-9092-1b3d91775cc2",
            "message": [
                {
                    "type": "text",
                    "content": "12:02"
                }
            ],
            "recipients": [
                "fee3e911-4060-47bc-9649-5cfb83961b0c",
                "0df1ab3a-d905-45b0-a4c1-9e80ed660010"
            ],
            "isDeleted": false,
            "createdAt": "1693890177325",
            "group": "1693846800000"
        },
        {
            "messageId": "5a999b80-328a-4ecb-b266-5b30f7217442",
            "conversationId": "a3730a54-8e05-42db-9092-1b3d91775cc2",
            "message": [
                {
                    "type": "text",
                    "content": "15:27"
                }
            ],
            "recipients": [
                "fee3e911-4060-47bc-9649-5cfb83961b0c",
                "0df1ab3a-d905-45b0-a4c1-9e80ed660010"
            ],
            "isDeleted": false,
            "createdAt": "1693902442960",
            "group": "1693846800000"
        },
        {
            "messageId": "6eabf8aa-c381-41d2-b665-ff18241e4447",
            "conversationId": "a3730a54-8e05-42db-9092-1b3d91775cc2",
            "message": [
                {
                    "type": "text",
                    "content": "15:28"
                }
            ],
            "recipients": [
                "fee3e911-4060-47bc-9649-5cfb83961b0c",
                "0df1ab3a-d905-45b0-a4c1-9e80ed660010"
            ],
            "isDeleted": false,
            "createdAt": "1693902529066",
            "group": "1693846800000"
        },
        {
            "messageId": "f27e43bb-a3b4-436e-bacc-80ab34c304bb",
            "conversationId": "a3730a54-8e05-42db-9092-1b3d91775cc2",
            "message": [
                {
                    "type": "text",
                    "content": "15:29"
                }
            ],
            "recipients": [
                "fee3e911-4060-47bc-9649-5cfb83961b0c",
                "0df1ab3a-d905-45b0-a4c1-9e80ed660010"
            ],
            "isDeleted": false,
            "createdAt": "1693902583911",
            "group": "1693846800000"
        },
        {
            "messageId": "aa7d3bc7-84b9-4746-ad9c-6b8b15797589",
            "conversationId": "a3730a54-8e05-42db-9092-1b3d91775cc2",
            "message": [
                {
                    "type": "text",
                    "content": "11:00"
                }
            ],
            "sender": "0df1ab3a-d905-45b0-a4c1-9e80ed660010",
            "recipients": [
                "fee3e911-4060-47bc-9649-5cfb83961b0c",
                "0df1ab3a-d905-45b0-a4c1-9e80ed660010"
            ],
            "isDeleted": false,
            "createdAt": "1693972842020",
            "group": "1693933200000"
        },
        {
            "messageId": "64acfffe-ddba-4f01-ad6e-07e08bc9ed24",
            "conversationId": "a3730a54-8e05-42db-9092-1b3d91775cc2",
            "message": [
                {
                    "type": "image",
                    "content": "16 49?versionId=QLBpjTMzQzoobe6Uz4Ty3nkvFIAr2ppf"
                },
                {
                    "type": "image",
                    "content": "16_48_1?versionId=50sV.xTDgrMkgm89wAykJc6pidoDdgcs"
                }
            ],
            "recipients": [
                "fee3e911-4060-47bc-9649-5cfb83961b0c",
                "0df1ab3a-d905-45b0-a4c1-9e80ed660010"
            ],
            "isDeleted": false,
            "createdAt": "1693993653141",
            "group": "1693933200000"
        },
        {
            "messageId": "b0f5bd38-8792-4630-a93f-eb88ed036363",
            "conversationId": "a3730a54-8e05-42db-9092-1b3d91775cc2",
            "message": [
                {
                    "type": "image",
                    "content": "kanji7.jpg?versionId=4QWMXZGBeWo3mDhSkmxIK6fqRUMB8sPN"
                },
                {
                    "type": "image",
                    "content": "306449844_1140837146847368_vocab7_n.jpg?versionId=Y7bK4W02Ui_Msv3GUd7ft5O3ApqVCgAu"
                },
                {
                    "type": "image",
                    "content": "vocab.jpeg?versionId=LsaVP0VmcLKcqCyZodDIAAT0pH0BsUsJ"
                }
            ],
            "recipients": [
                "fee3e911-4060-47bc-9649-5cfb83961b0c",
                "0df1ab3a-d905-45b0-a4c1-9e80ed660010"
            ],
            "isDeleted": false,
            "createdAt": "1693995779273",
            "group": "1693933200000"
        },
        {
            "messageId": "f38c1fbb-bcba-46e0-9207-c51850ff82d2",
            "conversationId": "a3730a54-8e05-42db-9092-1b3d91775cc2",
            "message": [
                {
                    "type": "text",
                    "content": "18:33"
                }
            ],
            "recipients": [
                "fee3e911-4060-47bc-9649-5cfb83961b0c",
                "0df1ab3a-d905-45b0-a4c1-9e80ed660010"
            ],
            "isDeleted": false,
            "createdAt": "1693999986666",
            "group": "1693933200000"
        },
        {
            "messageId": "f8c5fba0-3a10-4ec5-b290-64b3b748b7a1",
            "conversationId": "a3730a54-8e05-42db-9092-1b3d91775cc2",
            "message": [
                {
                    "type": "text",
                    "content": "18:34"
                }
            ],
            "recipients": [
                "fee3e911-4060-47bc-9649-5cfb83961b0c",
                "0df1ab3a-d905-45b0-a4c1-9e80ed660010"
            ],
            "isDeleted": false,
            "createdAt": "1694000085068",
            "group": "1693933200000"
        },
        {
            "messageId": "29ca7a3a-dfcb-4489-a4be-bda3438eedfc",
            "conversationId": "a3730a54-8e05-42db-9092-1b3d91775cc2",
            "message": [
                {
                    "type": "text",
                    "content": "18:38"
                }
            ],
            "recipients": [
                "fee3e911-4060-47bc-9649-5cfb83961b0c",
                "0df1ab3a-d905-45b0-a4c1-9e80ed660010"
            ],
            "isDeleted": false,
            "createdAt": "1694000293543",
            "group": "1693933200000"
        },
        {
            "messageId": "00322524-4482-46dd-9c94-8ead9167049b",
            "conversationId": "a3730a54-8e05-42db-9092-1b3d91775cc2",
            "message": [
                {
                    "type": "text",
                    "content": "18:40"
                }
            ],
            "recipients": [
                "fee3e911-4060-47bc-9649-5cfb83961b0c",
                "0df1ab3a-d905-45b0-a4c1-9e80ed660010"
            ],
            "isDeleted": false,
            "createdAt": "1694000404462",
            "group": "1693933200000"
        },
        {
            "messageId": "8df49b9f-a0b1-4831-9ceb-df77ec80d041",
            "conversationId": "a3730a54-8e05-42db-9092-1b3d91775cc2",
            "message": [
                {
                    "type": "text",
                    "content": "18:43"
                }
            ],
            "recipients": [
                "fee3e911-4060-47bc-9649-5cfb83961b0c",
                "0df1ab3a-d905-45b0-a4c1-9e80ed660010"
            ],
            "isDeleted": false,
            "createdAt": "1694000617414",
            "group": "1693933200000"
        },
        {
            "messageId": "980ea918-7459-4bd5-a48c-25b9b2610541",
            "conversationId": "a3730a54-8e05-42db-9092-1b3d91775cc2",
            "message": [
                {
                    "type": "text",
                    "content": "19:03"
                }
            ],
            "recipients": [
                "fee3e911-4060-47bc-9649-5cfb83961b0c",
                "0df1ab3a-d905-45b0-a4c1-9e80ed660010"
            ],
            "isDeleted": false,
            "createdAt": "1694001787290",
            "group": "1693933200000"
        },
        {
            "messageId": "7847469c-8645-45f1-8e46-8df2b81c7e92",
            "conversationId": "a3730a54-8e05-42db-9092-1b3d91775cc2",
            "message": [
                {
                    "type": "text",
                    "content": "19:18"
                }
            ],
            "sender": "0df1ab3a-d905-45b0-a4c1-9e80ed660010",
            "recipients": [
                "0df1ab3a-d905-45b0-a4c1-9e80ed660010",
                "fee3e911-4060-47bc-9649-5cfb83961b0c"
            ],
            "isDeleted": false,
            "createdAt": "1694002709337",
            "group": "1693933200000"
        },
        {
            "messageId": "5be65612-dc1f-4291-adb5-f35cd52bf92b",
            "conversationId": "a3730a54-8e05-42db-9092-1b3d91775cc2",
            "message": [
                {
                    "type": "text",
                    "content": "19:19"
                }
            ],
            "sender": "0df1ab3a-d905-45b0-a4c1-9e80ed660010",
            "recipients": [
                "0df1ab3a-d905-45b0-a4c1-9e80ed660010",
                "fee3e911-4060-47bc-9649-5cfb83961b0c"
            ],
            "isDeleted": false,
            "createdAt": "1694002752349",
            "group": "1693933200000"
        },
        {
            "messageId": "c5f47c00-f9fa-4a52-8112-51aa32dafa02",
            "conversationId": "a3730a54-8e05-42db-9092-1b3d91775cc2",
            "message": [
                {
                    "type": "text",
                    "content": "19:20"
                }
            ],
            "sender": "0df1ab3a-d905-45b0-a4c1-9e80ed660010",
            "recipients": [
                "0df1ab3a-d905-45b0-a4c1-9e80ed660010",
                "fee3e911-4060-47bc-9649-5cfb83961b0c"
            ],
            "isDeleted": false,
            "createdAt": "1694002808489",
            "group": "1693933200000"
        },
        {
            "messageId": "df4d0d5b-8fa2-47db-b1b8-04fbb44009c8",
            "conversationId": "a3730a54-8e05-42db-9092-1b3d91775cc2",
            "message": [
                {
                    "type": "text",
                    "content": "19:20"
                }
            ],
            "sender": "0df1ab3a-d905-45b0-a4c1-9e80ed660010",
            "recipients": [
                "0df1ab3a-d905-45b0-a4c1-9e80ed660010",
                "fee3e911-4060-47bc-9649-5cfb83961b0c"
            ],
            "isDeleted": false,
            "createdAt": "1694002823479",
            "group": "1693933200000"
        },
        {
            "messageId": "4e3a0035-b59d-45bd-929d-23f726188bd9",
            "conversationId": "a3730a54-8e05-42db-9092-1b3d91775cc2",
            "message": [
                {
                    "type": "text",
                    "content": "19:20"
                }
            ],
            "recipients": [
                "fee3e911-4060-47bc-9649-5cfb83961b0c",
                "0df1ab3a-d905-45b0-a4c1-9e80ed660010"
            ],
            "isDeleted": false,
            "createdAt": "1694002846091",
            "group": "1693933200000"
        },
        {
            "messageId": "96d970ca-d980-4d31-bb36-a666cb3fdcb6",
            "conversationId": "a3730a54-8e05-42db-9092-1b3d91775cc2",
            "message": [
                {
                    "type": "text",
                    "content": "19:21"
                }
            ],
            "recipients": [
                "fee3e911-4060-47bc-9649-5cfb83961b0c",
                "0df1ab3a-d905-45b0-a4c1-9e80ed660010"
            ],
            "isDeleted": false,
            "createdAt": "1694002876071",
            "group": "1693933200000"
        },
        {
            "messageId": "2fff9026-1eff-4749-a56c-95dbbcf2dede",
            "conversationId": "a3730a54-8e05-42db-9092-1b3d91775cc2",
            "message": [
                {
                    "type": "text",
                    "content": "20:26"
                }
            ],
            "sender": "0df1ab3a-d905-45b0-a4c1-9e80ed660010",
            "recipients": [
                "0df1ab3a-d905-45b0-a4c1-9e80ed660010",
                "fee3e911-4060-47bc-9649-5cfb83961b0c"
            ],
            "isDeleted": false,
            "createdAt": "1694006769041",
            "group": "1693933200000"
        },
        {
            "messageId": "e3c2e1cf-f480-4891-833d-5203860451cd",
            "conversationId": "a3730a54-8e05-42db-9092-1b3d91775cc2",
            "message": [
                {
                    "type": "text",
                    "content": "00:06"
                }
            ],
            "recipients": [
                "fee3e911-4060-47bc-9649-5cfb83961b0c",
                "0df1ab3a-d905-45b0-a4c1-9e80ed660010"
            ],
            "isDeleted": false,
            "createdAt": "1694019984889",
            "group": "1694019600000"
        },
        {
            "messageId": "50410ee1-bdbb-4907-90de-a1c3435dd9f3",
            "conversationId": "a3730a54-8e05-42db-9092-1b3d91775cc2",
            "message": [
                {
                    "type": "text",
                    "content": "15:40"
                }
            ],
            "sender": "0df1ab3a-d905-45b0-a4c1-9e80ed660010",
            "recipients": [
                "0df1ab3a-d905-45b0-a4c1-9e80ed660010",
                "fee3e911-4060-47bc-9649-5cfb83961b0c"
            ],
            "isDeleted": true,
            "createdAt": "1694076013878",
            "group": "1694019600000"
        }
    ]