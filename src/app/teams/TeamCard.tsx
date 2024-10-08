import {
  Card,
  CardContent,
  CardHeader,
  Link,
  Paper,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { ITeam } from "interfaces";
import { useMemo } from "react";
import { findLogo } from "utils";

const PaperResult = ({
  team,
  field,
}: {
  team: ITeam;
  field: "victories" | "defeats";
}) => {
  const theme = useTheme();
  const bgColor = useMemo(() => {
    return field === "victories"
      ? theme.palette.success.light
      : theme.palette.error.light;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [field]);
  return (
    <Paper
      variant="outlined"
      sx={{
        width: 60,
        height: 30,
        textAlign: "center",
        alignContent: "center",
        mx: 1,
        backgroundColor: bgColor,
      }}
    >
      {team[field]}
    </Paper>
  );
};

const getPosition = (position: number) => {
  if (position > 6 && position <= 10) {
    return "In PlayIn";
  }
  if (position <= 6) {
    return "In PlayOff";
  }
  return "";
};

const TeamCard = ({ team, position }: { team: ITeam; position: number }) => {
  return (
    <Link
      href={`/teams/${team.code}`}
      underline="none"
      sx={{
        // minHeight: '239.350px',
        display: "flex",
        justifyContent: "center",
      }}
    >
      <Card
        sx={{
          ":hover": {
            boxShadow: 20,
          },
          maxWidth: "184px",
          backgroundColor: "primary.light",
        }}
      >
        <CardHeader
          title={
            <Stack>
              <Typography>{team.name}</Typography>
              <Typography>{getPosition(position)}</Typography>
            </Stack>
          }
          sx={{ textAlign: "center", minHeight: `${37.35 + 32}px`, pb: 0 }}
        ></CardHeader>
        <CardContent sx={{ pt: 0 }}>
          <Stack justifyContent={"center"} alignItems={"center"}>
            {findLogo(String(team.code))}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                width: "100%",
                height: "100%",
              }}
            >
              <PaperResult team={team} field={"victories"}></PaperResult>
              <PaperResult team={team} field={"defeats"}></PaperResult>
            </div>
          </Stack>
        </CardContent>
      </Card>
    </Link>
  );
};

export default TeamCard;
