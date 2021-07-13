import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';
import MainGrid  from '../src/components/MainGrid'
import Box from '../src/components/Box'
import {AlurakutMenu, OrkutNostalgicIconSet} from '../src/lib/AlurakutCommons';
function ProfileSidebar(prop){
  return(
    <Box >
          <img src={`https://github.com/${prop.githubUser}.png`} style = {{borderRadius: '8px'}}/>
    </Box>
  )
}

export default function Home() {
  
  const githubUser = 'blandow';
  const friendList = [
    'blandow',
    'acnelio',
    'juunegreiros',
    'luizomf',
    'leandrosdias'

  ];
  return(
    <>

      <AlurakutMenu />
      <MainGrid>
        <div className = "profileArea" style = {{gridArea: 'profileArea'}}>
          <ProfileSidebar githubUser = {githubUser}/>    
        </div>
        <div className = "welcomeArea" style = {{gridArea: 'welcomeArea'}}>
          <Box>
            <h1 className = "title">Bem vindo</h1>
            <OrkutNostalgicIconSet/>
          </Box>
        </div>

        <div className = "profileRelationsArea" style = {{gridArea: 'profileRelationsArea'}}>
          <Box >
            comunidades
          </Box>
          <ProfileRelationsBoxWrapper>
            <h2 className = "smallTitle">Pessoas da comunidade {friendList.length}</h2>
            
            <ul>{friendList.map((item)=>{
              return(
                <li>
                  <a href={`/users/${item}`} key = {item}>
                    <img src={`https://github.com/${item}.png`} />
                    <span>{item}</span>
                  </a>
                </li>
              );
            })}</ul>
          </ProfileRelationsBoxWrapper>
        </div>

      </MainGrid>
    </>
  )
}
