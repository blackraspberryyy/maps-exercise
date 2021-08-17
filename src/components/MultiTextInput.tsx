import { Typography, TypographyProps } from "@rmwc/typography";
import { CSSProperties, useState } from "react";
import CreatableSelect from "react-select/creatable";
import styled from "styled-components";

const selectStyles = (hasError: boolean) => ({
  valueContainer: (styles: CSSProperties) => ({
    ...styles,
    minHeight: "55px",
  }),
  control: (styles: CSSProperties, state: any) => ({
    ...styles,
    marginRight: 8,
    marginLeft: 8,
    ...(hasError && {
      borderColor: "red",
      boxShadow: state.menuIsOpen ? "0 0 0 1px red inset" : "0",
    }),
    "&:hover": {
      borderColor: hasError
        ? "red"
        : state.isFocused
        ? styles.borderColor
        : "#000000",
    },
  }),
  placeholder: (styles: CSSProperties) => ({
    ...styles,
    color: hasError ? "red" : "#808080",
  }),
  menuPortal: (styles: CSSProperties) => ({
    ...styles,
    zIndex: 10,
  }),
});

const StyledLabel = styled(Typography)<
  TypographyProps & { color: string; invalid?: boolean }
>`
  ${({ color, invalid }) => `
    margin-left: 16px;
    display: inline-block;
    color: ${invalid ? "red" : color};
  `}
` as React.FC<TypographyProps & { color: string; invalid?: boolean }>;

function MultiTextInput(props: any) {
  const {
    className,
    name,
    onBlur,
    label,
    invalid,
    helpText,
    changeOptionLabel,
    changeOptionValue,
    ...rest
  } = props;
  const [isFocused, setIsFocused] = useState<boolean>(false);

  return (
    <div className={className}>
      {label && (
        <StyledLabel
          use="caption"
          color={isFocused ? "#6200ee" : "#7f7f7f"}
          invalid={invalid}
        >
          {label}
        </StyledLabel>
      )}
      <CreatableSelect
        styles={selectStyles(invalid)}
        components={{
          DropdownIndicator: null,
        }}
        menuIsOpen={false}
        theme={(themes) => ({
          ...themes,
          colors: {
            ...themes.colors,
            primary: "#6200ee",
            danger: "#b00020",
          },
        })}
        onFocus={() => setIsFocused(true)}
        onBlur={(e: any) => {
          e.target.name = name;
          if (onBlur) {
            onBlur(e);
          }
          setIsFocused(false);
        }}
        getOptionLabel={(option: any) => option[changeOptionLabel]}
        getOptionValue={(option: any) => option[changeOptionValue]}
        {...rest}
      />
      <StyledLabel use="caption" color={"#7f7f7f"} invalid={invalid}>
        {helpText || ""}
      </StyledLabel>
    </div>
  );
}

export default MultiTextInput;
