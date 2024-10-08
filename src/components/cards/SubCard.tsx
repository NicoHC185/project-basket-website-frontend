import PropTypes from 'prop-types';
import { forwardRef, ReactNode, Ref } from 'react';

// material-ui
import { useTheme, Theme } from '@mui/material/styles';
import { Card, CardContent, CardHeader, Divider, Typography, CardHeaderProps, CardContentProps } from '@mui/material';

// ==============================|| CUSTOM SUB CARD ||============================== //

interface SubCardProps {
  children?: ReactNode;
  content?: boolean;
  contentClass?: string;
  darkTitle?: boolean;
  secondary?: ReactNode | string | object;
  sx?: object;
  contentSX?: object;
  title?: string;
  // title?: ReactNode | string | object;
}

const SubCard = forwardRef(
  (
    {
      children,
      content = true,
      contentClass,
      darkTitle,
      secondary,
      sx = {},
      contentSX = {},
      title,
      ...others
    }: SubCardProps,
    ref: Ref<HTMLDivElement>
  ) => {
    const theme: Theme = useTheme();

    return (
      <Card
        ref={ref}
        sx={{
          border: `1px solid ${theme.palette.primary.dark}`,
          ':hover': {
            boxShadow: '0 2px 14px 0 rgb(32 40 45 / 8%)',
          },
          backgroundColor: "primary.light",
          ...sx,
        }}
        {...others}
      >
        {/* card header and action */}
        {!darkTitle && title && (
          <CardHeader
            sx={{ p: 2.5 }}
            title={<Typography variant="h5">{title}</Typography>}
            action={secondary as CardHeaderProps['action']}
          />
        )}
        {darkTitle && title && (
          <CardHeader
            sx={{ p: 2.5 }}
            title={<Typography variant="h4">{title}</Typography>}
            action={secondary as CardHeaderProps['action']}
          />
        )}

        {/* content & header divider */}
        {title && (
          <Divider
            sx={{
              opacity: 1,
              borderColor: theme.palette.primary.dark,
            }}
          />
        )}

        {/* card content */}
        {content && (
          <CardContent
            sx={{ p: 2.5, ...contentSX }}
            className={contentClass || ''}
            {...(others as CardContentProps)}
          >
            {children}
          </CardContent>
        )}
        {!content && children}
      </Card>
    );
  }
);

SubCard.propTypes = {
  children: PropTypes.node,
  content: PropTypes.bool,
  contentClass: PropTypes.string,
  darkTitle: PropTypes.bool,
  secondary: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.object]),
  sx: PropTypes.object,
  contentSX: PropTypes.object,
  // title: PropTypes.oneOfType([PropTypes.node, PropTypes.string, PropTypes.object]),
};

SubCard.defaultProps = {
  content: true,
};

SubCard.displayName = 'SubCard'

export default SubCard;
