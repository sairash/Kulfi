import { reactive } from "vue";

const state = reactive({
    displayBottomInfo: false,
    displayBackButton: false,
    height: 661,
    width: 0,
    progressbarEvent: '',
    jsonBottomInfo: {
        name: 'N/A',
        poster: 'N/A',
        date: 'N/A',
        age: 'N/A',
        extraInfo: 'N/A',
        description: 'N/A',
        link:'N/A',
        backgroundPost: 'N/A',
        tag: 'N/A'
    },
})

const methods = {
    displayBottomInfoChange(data){
        state.displayBottomInfo = data
    },
    displayBackButtonChange(data){
        state.displayBackButton = data
    },
    heightChange(amount){
        state.height = amount
    },
    widthChange(amount){
        state.width = amount
    },
    progressbarEventChange(event){
        state.progressbarEvent = event
    },
    getDescriptionShort(dis, amount){
        var smallDis = ''
        for (var i = 0; i < dis.length; i++) {
            if(i < amount){
                smallDis += dis.charAt(i);
            }
        }
        if(dis.length > amount){
            smallDis += '...'
        }
        return(smallDis);
    },
    jsonBottomInfoChange(original_title, poster, release_date, age, extraInfo, description, link, backgroundPost, tag){
        state.jsonBottomInfo.name = this.getDescriptionShort(original_title, 20),
        state.jsonBottomInfo.poster = 'https://www.themoviedb.org/t/p/w220_and_h330_face'+poster,
        state.jsonBottomInfo.date = release_date.toString().split("-")[0],
        state.jsonBottomInfo.age = age,
        state.jsonBottomInfo.extraInfo = extraInfo,
        state.jsonBottomInfo.description = this.getDescriptionShort(description, 100),
        state.jsonBottomInfo.link = '/'+link,
        state.jsonBottomInfo.backgroundPost = 'https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces'+backgroundPost,
        state.jsonBottomInfo.tag = tag,
        this.displayBottomInfoChange(true)
    },
}

export default{
    state,
    methods
}