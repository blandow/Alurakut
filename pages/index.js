import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations';
import MainGrid from '../src/components/MainGrid';
import Box from '../src/components/Box';
import { AlurakutMenu, OrkutNostalgicIconSet, AlurakutProfileSidebarMenuDefault } from '../src/lib/AlurakutCommons';
import React from 'react';
import nookies from 'nookies';
import jwt from 'jsonwebtoken';

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

export default function Home(props) {

  const githubUser = props.githubUser;
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
    .then((resServer) => { setFollowers(resServer); }), []);

  const [comunit, setComunit] = React.useState([]);

  fetch('https://graphql.datocms.com/', {
    method: 'POST',
    headers: {
      'Authorization': '3695c0bd0c7d88ad1492cb061a739c',
      'Content-Type': 'aplication/json',
      'Accept': 'aplication/json',
    },
    body: JSON.stringify({
      "query": `query {
      allComunits{
        title
        idComunit
        imageLink
      }
    }`})
  })
    .then((res) => res.json())
    .then((completeRes) => {
      setComunit(completeRes.data.allCommunities)

    });



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

                title: formData.get("title"),
                imageLink: formData.get("image"),
              }

              fetch('/api/comunit', {
                method: 'POST',
                header: {
                  'Content-Type': 'application/json',
                },

                body: JSON.stringify(comunitObj)
              })
                .then(async (response) => {
                  const data = await response.json();
                  const createdComunit = data.createdData;

                  const fillComunit = [...comunit, createdComunit];
                  setComunit(fillComunit);
                })
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

                    <li key={item.idComunit}>
                      <a href={`/comunits/${item.idComunit}`} >
                        <img src={item.imageLink} />
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



export async function getServerSideProps(context) {
  const token = nookies.get(context).USER_TOKEN;
  

  const { isAuthenticated } = await fetch('https://alurakut.vercel.app/api/auth', {
    headers: {
      Authorization: token
    }
  })
    .then((res) => res.json())

  if(!isAuthenticated){
    return{
      redirect:{
        destination:'/login',
        permanent:false
      }
    }
  }
  const { githubUser } = jwt.decode(token);
  return {
    props: {
      githubUser
    }, // will be passed to the page component as props
  }
}