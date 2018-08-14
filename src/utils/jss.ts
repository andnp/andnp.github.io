import { Styles } from 'jss';
import * as React from 'react';
import { Nominal } from 'simplytyped';

export const buildStyles = <S extends Styles<any>>(s: S) => s;

type JssClass = Nominal<string, 'JssClass'>;
type JssClassRecord<S extends Styles<any>> = Record<keyof S, JssClass>;

export const styledComponent = <S extends Styles<any>>(s: S) => {
  return class StyledComponent extends React.Component {
    protected classes: JssClassRecord<S>;

    constructor(props: any) {
      super(props);
      this.classes = props.classes;
    }
  }
};