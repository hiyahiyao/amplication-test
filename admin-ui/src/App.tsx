import React, { useEffect, useState } from "react";
import { Admin, DataProvider, Resource } from "react-admin";
import buildGraphQLProvider from "./data-provider/graphqlDataProvider";
import basicHttpAuthProvider from "./auth-provider/ra-auth-basic-http";
import { theme } from "./theme/theme";
import Login from "./Login";
import "./App.scss";
import Dashboard from "./pages/Dashboard";
import { UserList } from "./user/UserList";
import { UserCreate } from "./user/UserCreate";
import { UserEdit } from "./user/UserEdit";
import { UserShow } from "./user/UserShow";
import { TeamList } from "./team/TeamList";
import { TeamCreate } from "./team/TeamCreate";
import { TeamEdit } from "./team/TeamEdit";
import { TeamShow } from "./team/TeamShow";
import { PlayerList } from "./player/PlayerList";
import { PlayerCreate } from "./player/PlayerCreate";
import { PlayerEdit } from "./player/PlayerEdit";
import { PlayerShow } from "./player/PlayerShow";
import { MatchList } from "./match/MatchList";
import { MatchCreate } from "./match/MatchCreate";
import { MatchEdit } from "./match/MatchEdit";
import { MatchShow } from "./match/MatchShow";
import { CompositionList } from "./composition/CompositionList";
import { CompositionCreate } from "./composition/CompositionCreate";
import { CompositionEdit } from "./composition/CompositionEdit";
import { CompositionShow } from "./composition/CompositionShow";
import { PositionList } from "./position/PositionList";
import { PositionCreate } from "./position/PositionCreate";
import { PositionEdit } from "./position/PositionEdit";
import { PositionShow } from "./position/PositionShow";
import { LegendaryPlayerList } from "./legendaryPlayer/LegendaryPlayerList";
import { LegendaryPlayerCreate } from "./legendaryPlayer/LegendaryPlayerCreate";
import { LegendaryPlayerEdit } from "./legendaryPlayer/LegendaryPlayerEdit";
import { LegendaryPlayerShow } from "./legendaryPlayer/LegendaryPlayerShow";

const App = (): React.ReactElement => {
  const [dataProvider, setDataProvider] = useState<DataProvider | null>(null);
  useEffect(() => {
    buildGraphQLProvider
      .then((provider: any) => {
        setDataProvider(() => provider);
      })
      .catch((error: any) => {
        console.log(error);
      });
  }, []);
  if (!dataProvider) {
    return <div>Loading</div>;
  }
  return (
    <div className="App">
      <Admin
        title={"My app-83"}
        dataProvider={dataProvider}
        authProvider={basicHttpAuthProvider}
        theme={theme}
        dashboard={Dashboard}
        loginPage={Login}
      >
        <Resource
          name="User"
          list={UserList}
          edit={UserEdit}
          create={UserCreate}
          show={UserShow}
        />
        <Resource
          name="Team"
          list={TeamList}
          edit={TeamEdit}
          create={TeamCreate}
          show={TeamShow}
        />
        <Resource
          name="Player"
          list={PlayerList}
          edit={PlayerEdit}
          create={PlayerCreate}
          show={PlayerShow}
        />
        <Resource
          name="Match"
          list={MatchList}
          edit={MatchEdit}
          create={MatchCreate}
          show={MatchShow}
        />
        <Resource
          name="Composition"
          list={CompositionList}
          edit={CompositionEdit}
          create={CompositionCreate}
          show={CompositionShow}
        />
        <Resource
          name="Position"
          list={PositionList}
          edit={PositionEdit}
          create={PositionCreate}
          show={PositionShow}
        />
        <Resource
          name="LegendaryPlayer"
          list={LegendaryPlayerList}
          edit={LegendaryPlayerEdit}
          create={LegendaryPlayerCreate}
          show={LegendaryPlayerShow}
        />
      </Admin>
    </div>
  );
};

export default App;
