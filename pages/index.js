import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, OrkutNostalgicIconSet, AlurakutProfileSidebarMenuDefault } from '../src/lib/AlurakutCommons';
import React from 'react';

function ProfileRelationsBox(prop) {
  return (
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle"> {prop.title} ({prop.item.length})</h2>

      <ul>

      </ul>
    </ProfileRelationsBoxWrapper>

  )
}

function ProfileSidebar(prop) {
  return (
    <Box as="aside">
      <img src={`https://github.com/${prop.githubUser}.png`} style={{ borderRadius: '8px' }} />
      <hr />
      <p>
        <a className="boxLink" href={`https://github.com/${prop.githubUser}.png`}>
          @{prop.githubUser}

        </a>
      </p>
      <hr />
      <AlurakutProfileSidebarMenuDefault />
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

  const [followers, setFollowers] = React.useState([]);

  React.useEffect(() => fetch('https://api.github.com/users/peas/followers')
    .then((res) => res.json())
    .then((resServer) => setFollowers(resServer)), []);

  const [comunit, setComunit] = React.useState([{
    id: new Date().toISOString(),
    title: 'Eu odeio acordar cedo',
    image: 'https://alurakut.vercel.app/capa-comunidade-01.jpg'
  }]);


  return (
    <>

      <AlurakutMenu />
      <MainGrid>
        <div className="profileArea" style={{ gridArea: 'profileArea' }}>
          <ProfileSidebar githubUser={githubUser} />
        </div>
        <div className="welcomeArea" style={{ gridArea: 'welcomeArea' }}>
          <Box>
            <h1 className="title">Bem vindo</h1>
            <OrkutNostalgicIconSet />
          </Box>
          <Box>
            <h2 className="subTitle">
              O que você desea fazer?
            </h2>

            <form onSubmit={(evt) => {
              evt.preventDefault();
              const formData = new FormData(evt.target);
              const comunitObj = {
                id: new Date().toISOString(),
                title: formData.get("title"),
                image: formData.get("image"),
              }
              const fillComunit = [...comunit, comunitObj]
              setComunit(fillComunit);
            }}>
              <div>

                <input placeholder="Qual vai ser o nome da sua comunidade?"
                  name="title"
                  area-aria-label="Qual vai ser o nome da sua comunidade?"
                  type="text" />

              </div>

              <div>

                <input placeholder="Coloque uma URL para usarmo de capa"
                  name="image"
                  area-aria-label="Coloque uma URL para usarmo de capa" />

              </div>

              <button>
                Criar comunidade
              </button>
            </form>
          </Box>
        </div>

        <div className="profileRelationsArea" style={{ gridArea: 'profileRelationsArea' }}>
          <ProfileRelationsBox title="followers" item={followers} />
          <ProfileRelationsBoxWrapper>
            <ul>
              {
                comunit.map((item) => {

                  return (

                    <li key={item.id}>
                      <a href={`/users/${item.title}`} >
                        <img src={item.image} />
                        <span>{item.title}</span>
                      </a>
                    </li>
                  )

                })
              }
            </ul>
          </ProfileRelationsBoxWrapper>
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">Pessoas da comunidade {friendList.length}</h2>

            <ul>{friendList.map((item) => {
              return (
                <li key={item}>
                  <a href={`/users/${item}`} >
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
