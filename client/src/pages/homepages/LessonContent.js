import {useEffect, useState} from "react";
import {getData} from "../../_helper/httpProvider";
import {API_BASE_URL} from "../../config/configUrl";
import {Box, Button, Typography} from "@material-ui/core";
// import {Icon} from "@iconify/react";
import Code from "../../components/code/Code";
import {runCode} from "../../redux/slices/code";
import {PATH_PAGE} from "../../routes/paths";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

export default function LessonContent({idbh}) {
    const [lessons, setLesson] = useState();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        (async () => {
            const res = await getData(API_BASE_URL + `/api-v1/baihoc/${idbh}`);
            console.log(res.data)
            console.log(idbh, 'aaaaaaaaaaaaaaaaaaaaaaa')
            setLesson(res.data)
        })()
    }, [idbh]);


    return <>
        {lessons?.length > 0 && lessons?.map((e, idx) => (
            <Box key={idx}>
                <Typography variant='h6'>{e.ndbh_tieude}</Typography>
                <Box dangerouslySetInnerHTML={{__html: e.ndbh_mota}}/>
                <Box>
                    {!!e.ndbh_code && <Code code={e.ndbh_code} language={e.ndbh_code_lang}/>}
                </Box>
                {e.ndbh_code_run ? <Button variant='contained' onClick={() => {
                    dispatch(runCode({
                        code: e.ndbh_code,
                        lang: e.ndbh_code_lang
                    }));
                    navigate(PATH_PAGE.code, {replace: true})
                }} sx={{width: '20rem', my: 1}}>Chạy thử</Button> : ''}
                {
                e.video == 1 && 
                <Box sx={{marginTop: "25px"}}>
                    <Typography variant='h5'>Bạn có thể tham khảo qua video sau:</Typography>
                    <Box>
                        <iframe width="560" height="315" src="https://www.youtube.com/embed/AzmdwZ6e_aM" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </Box>
                </Box>
                }
            </Box>
        ))}
        {lessons?.length === 0 && <Typography>Chưa có bài học</Typography>}
    </>
}