import { Avatar } from '@mui/material'
import './UpdateChannel.css'
import { useState } from 'react'
import type { ChannelInterface } from '../../../Context/user'

interface UpdateChannelProps {
    inputRef:any,
    channel: ChannelInterface
}

export default function UpdateChannel(
    {
        inputRef,
        channel 
    }: UpdateChannelProps
) {
    const [src, setSrc] = useState<string>(channel.image);

    return (
        <div style={{padding: 20}}>
            <label htmlFor='photo-upload' className="custom-file-upload fas">
                <div className="img-wrap img-upload" >
                    <Avatar style={
                        {
                            width: "auto",
                            height: "100%",
                        }
                    } src={src}/>
                </div>
            </label>
            <input ref={inputRef} id="photo-upload" type="file" onChange={
                (e:any)=>{
                    const reader = new FileReader();
                    const file = e.target.files[0];
                    reader.onloadend = () => {
                        setSrc(reader.result as string);
                    }
                    reader.readAsDataURL(file);
                }
            } accept='image/*'/>
        </div>
    )
}
