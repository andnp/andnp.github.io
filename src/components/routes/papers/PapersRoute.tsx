import { parseBibFile, } from 'bibtex';
import * as React from 'react';
import Markdown from '../../utils/Markdown';

const bibFile = parseBibFile(`
@article{pan2018organizing,
  title={Organizing Experience: A Deeper Look at Replay Mechanisms for Sample-based Planning in Continuous State Domains},
  author={Pan, Yangchen and Zaheer, Muhammad and White, Adam and Patterson, Andrew and White, Martha},
  journal={arXiv preprint arXiv:1806.04624},
  year={2018}
}

@article{schlegel2018discovery,
  title={Discovery of Predictive Representations With a Network of General Value Functions},
  author={Schlegel, Matthew and Patterson, Andrew and White, Adam and White, Martha},
  year={2018}
}

@article{schlegel2018general,
  title={General Value Function Networks},
  author={Schlegel, Matthew and White, Adam and Patterson, Andrew and White, Martha},
  journal={arXiv preprint arXiv:1807.06763},
  year={2018}
}

@article{ghiassian2018online,
  title={Online Off-policy Prediction},
  author={Ghiassian, Sina and Patterson, Andrew and White, Martha and Sutton, Richard S and White, Adam},
  journal={arXiv preprint arXiv:1811.02597},
  year={2018}
}

@inproceedings{le2018supervised,
  title={Supervised autoencoders: Improving generalization performance with unsupervised regularizers},
  author={Le, Lei and Patterson, Andrew and White, Martha},
  booktitle={Advances in Neural Information Processing Systems},
  pages={107--117},
  year={2018}
}

@article{avesani2018open,
  title={The open diffusion data derivatives, brain data upcycling via integrated publishing of derivatives and reproducible open cloud services},
  author={Avesani, Paolo and McPherson, Brent and Hayashi, Soichi and Caiafa, Cesar and Henschel, Robert and Garyfallidis, Eleftherios and Kitchell, Lindsey and Bullock, Daniel and Patterson, Andrew and Olivetti, Emanuele and others},
  year={2018},
  publisher={PsyArXiv}
}
`);


const bibMarkdown = bibFile.entries_raw.map(entry => {
  const titleRaw = entry.getFieldAsString('TITLE');
  const authorsRaw = entry.getFieldAsString('AUTHOR');
  const publisher = entry.getFieldAsString('PUBLISHER') || entry.getFieldAsString('booktitle') || entry.getFieldAsString('journal') || 'arXiv';
  const year = entry.getFieldAsString('YEAR');

  if (typeof titleRaw !== 'string') throw new Error('Expected bibliographic entry to have a title');
  if (typeof authorsRaw !== 'string') throw new Error('Expected authors to exist');

  const title = titleRaw.endsWith('.') ? titleRaw : titleRaw + '.';

  const authorList = authorsRaw.split('and').map(author => {
    const names = author.trim().split(',');
    if (names.length < 2) return names[0];

    const [lastName, firstName] = names;

    return `${firstName} ${lastName}`;
  });
  const lastAuthorIdx = authorList.length - 1;
  authorList[lastAuthorIdx] = `and ${authorList[lastAuthorIdx]}`;
  const authors = authorList.join(', ');

  return `
**${title}** ${authors} _${publisher}_, ${year}
`;
});

const markdown = `
  ## Papers

  ${bibMarkdown.join('\n\n')}
`;

class AboutRoute extends React.Component {
  public render() {
    return (
      <div style={{ maxWidth: '800px' }}>
        <Markdown raw={markdown} />
      </div>
    );
  }
}

export default AboutRoute;
