import ButtonAuth from "./components/ButtonAuth";
import Container from "./components/Container";
import Input from "./components/Input";
import Title from "./components/Title";
import constant from "./constant";

export default function SetUpUsername() {
    return (
        <Container>
            <Title value={"Set up username"}/>
            
            {constant.usernameForm.map((input,index)=>{
                return <Input key={index} type={input.name} placeholder={input.placeholder} name={input.name} icon={input.icon}/>
            })}
            <ButtonAuth value={"Submit"}/>

        </Container>
    )
}
