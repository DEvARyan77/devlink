    import { NextResponse } from 'next/server';
    import { v2 as cloudinary } from 'cloudinary';
    import path from "path";
    import { writeFile,unlink } from "fs/promises";

    cloudinary.config({ 
        cloud_name: 'daswnxocr', 
        api_key: '762186716885117', 
        api_secret: 'qKLfrRtacCrRfe3PUty5keUId7s' // Click 'View API Keys' above to copy your API secret
    });

    export async function POST(req) {  
        const formData = await req.formData();
        const file = formData.get('Image');
        const buffer = Buffer.from(await file.arrayBuffer());
        const filename =  file.name.replaceAll(" ", "_");
        console.log(filename);
        try {
        await writeFile(
            path.join(process.cwd(), "temp/" + filename),
            buffer
        );
        } catch (error) {
        console.log("Error occured ", error);
        return NextResponse.json({ Message: "Failed", status: 500 });
        }
        const uploadResult = await cloudinary.uploader
        .upload(
            path.join(process.cwd(), "temp/" + filename), {
                public_id: formData.get('Username'),
            }
        )
        .catch((error) => {
            console.log(error);
        });
        await unlink(path.join(process.cwd(), "temp/" + filename));
        console.log(uploadResult);
        return NextResponse.json({sta:true})
    }