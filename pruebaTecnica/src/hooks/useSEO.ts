import { useEffect } from "react";

export fuction useSeo({ title, description }: { title: string, description: string}){
	
	useEffect(()=> {
		document.title = title;
		document.querySelector('meta[name="descriptio"]')
		?.setAttribute("content", description);
	}, [title, description])
}
