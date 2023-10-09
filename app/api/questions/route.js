import { NextResponse } from "next/server";
import path from "path";
import fsPromises from 'fs/promises'; 

export async function GET(request) {
    const searchParams = request.nextUrl.searchParams
    const amount = searchParams.get('amount')

    if(!amount) return NextResponse.json({
        done: false, 
        message: "No se ha especificado la cantidad de preguntas"
    });

    const decoded = await ReadJSON();

    if(decoded) return NextResponse.json({
        done: true,
        questions: decoded.questions.sort(() => Math.random() - Math.random()).slice(0, amount).map(({
            correct, ...params
        }) => params)
    });

    return NextResponse.json({
        done: false, 
        message: "Error al procesar las preguntas"
    })
}

export async function POST(request) {
    const data = await request.json();
    const { question, letter } = data;
    const decoded = await ReadJSON();

    if(!question || !letter) return NextResponse.json({
        done: false, 
        message: "No se ha enviado la pregunta o la respuesta"
    });

    const currentQuestion = decoded.questions.find(single => single.question == question);
    
    if(currentQuestion.correct == letter) return NextResponse.json({
        done: true, 
        correct: true,
    });

    return NextResponse.json({
        done: true, 
        correct: false
    });
}

async function ReadJSON() {
    const filePath = path.join(process.cwd(), './config.json');
    const jsonFile = await fsPromises.readFile(filePath); 
    const decoded = JSON.parse(jsonFile); 

    return decoded; 
}